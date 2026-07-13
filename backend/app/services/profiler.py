from __future__ import annotations

import math
from typing import Any

import numpy as np
import pandas as pd

from app.models.schemas import (
    CategoricalStats,
    ColumnProfile,
    ColumnType,
    DatasetSummary,
    FlagSeverity,
    HealthStatus,
    NumericStats,
    ProfileReport,
    QualityFlag,
)


IDENTIFIER_NAME_HINTS = (
    "id",
    "uuid",
    "guid",
    "key",
    "code",
    "sku",
    "cpf",
    "cnpj",
    "ssn",
)

METHODOLOGY = [
    "Types are inferred from non-null values with lightweight heuristics (numeric, boolean, datetime, categorical, text).",
    "Completeness is 1 - (total null cells / total cells).",
    "Duplicate ratio counts fully identical rows.",
    "Numeric outliers use a Tukey fence (1.5 × IQR) on non-null values.",
    "Health score starts at 100 and subtracts weighted penalties from explainable quality flags.",
    "Status bands: healthy ≥ 80, attention 50–79, critical < 50.",
]


def _safe_float(value: Any) -> float | None:
    if value is None or (isinstance(value, float) and math.isnan(value)):
        return None
    try:
        result = float(value)
    except (TypeError, ValueError):
        return None
    if math.isnan(result) or math.isinf(result):
        return None
    return result


def _is_boolean_series(series: pd.Series) -> bool:
    normalized = series.dropna().astype(str).str.strip().str.lower()
    if normalized.empty:
        return False
    allowed = {"true", "false", "0", "1", "yes", "no", "y", "n", "sim", "nao", "não"}
    return bool(normalized.isin(allowed).all())


def _is_datetime_series(series: pd.Series) -> bool:
    sample = series.dropna().astype(str).head(50)
    if sample.empty:
        return False
    # Avoid pandas format-inference warnings on mixed/dirty columns.
    with pd.option_context("mode.chained_assignment", None):
        parsed = pd.to_datetime(sample, errors="coerce", utc=True, format="mixed")
    return float(parsed.notna().mean()) >= 0.8


def _looks_like_identifier(name: str, series: pd.Series) -> bool:
    lowered = name.strip().lower()
    name_hit = any(
        lowered == hint or lowered.endswith(f"_{hint}") or lowered.startswith(f"{hint}_")
        for hint in IDENTIFIER_NAME_HINTS
    )
    non_null = series.dropna()
    if non_null.empty:
        return False
    unique_ratio = non_null.nunique(dropna=True) / len(non_null)
    return name_hit and unique_ratio >= 0.95


def infer_column_type(name: str, series: pd.Series) -> ColumnType:
    non_null = series.dropna()
    if non_null.empty:
        return ColumnType.UNKNOWN

    if _looks_like_identifier(name, series):
        return ColumnType.IDENTIFIER

    if _is_boolean_series(series):
        return ColumnType.BOOLEAN

    numeric = pd.to_numeric(non_null, errors="coerce")
    if float(numeric.notna().mean()) >= 0.9:
        return ColumnType.NUMERIC

    if _is_datetime_series(series):
        return ColumnType.DATETIME

    unique_ratio = non_null.nunique(dropna=True) / len(non_null)
    avg_len = non_null.astype(str).str.len().mean()
    if unique_ratio <= 0.5 and avg_len <= 40:
        return ColumnType.CATEGORICAL

    return ColumnType.TEXT


def _numeric_stats(series: pd.Series) -> tuple[NumericStats, list[dict[str, float | int]]]:
    numeric = pd.to_numeric(series, errors="coerce").dropna()
    if numeric.empty:
        return NumericStats(count=0), []

    q1 = float(numeric.quantile(0.25))
    q3 = float(numeric.quantile(0.75))
    iqr = q3 - q1
    if iqr == 0:
        outlier_ratio = 0.0
    else:
        lower = q1 - 1.5 * iqr
        upper = q3 + 1.5 * iqr
        outlier_ratio = float(((numeric < lower) | (numeric > upper)).mean())

    hist_counts, bin_edges = np.histogram(numeric, bins=min(12, max(5, int(numeric.nunique()))))
    histogram = [
        {
            "bin_start": float(bin_edges[i]),
            "bin_end": float(bin_edges[i + 1]),
            "count": int(hist_counts[i]),
        }
        for i in range(len(hist_counts))
    ]

    stats = NumericStats(
        count=int(len(numeric)),
        mean=_safe_float(numeric.mean()),
        std=_safe_float(numeric.std()),
        min=_safe_float(numeric.min()),
        q25=_safe_float(q1),
        median=_safe_float(numeric.median()),
        q75=_safe_float(q3),
        max=_safe_float(numeric.max()),
        skew=_safe_float(numeric.skew()),
        zero_ratio=_safe_float((numeric == 0).mean()),
        outlier_ratio=_safe_float(outlier_ratio),
    )
    return stats, histogram


def _categorical_stats(series: pd.Series) -> CategoricalStats:
    counts = series.dropna().astype(str).value_counts().head(10)
    top_values = [{"value": str(idx), "count": int(count)} for idx, count in counts.items()]
    return CategoricalStats(top_values=top_values)


def _column_flags(name: str, series: pd.Series, inferred: ColumnType, null_ratio: float, unique_ratio: float, numeric_stats: NumericStats | None) -> list[QualityFlag]:
    flags: list[QualityFlag] = []
    non_null = series.dropna()

    if null_ratio >= 0.999:
        flags.append(
            QualityFlag(
                code="empty_column",
                column=name,
                severity=FlagSeverity.CRITICAL,
                message="Column is empty",
                detail="Almost every value is missing; consider dropping or fixing the source extract.",
            )
        )
    elif null_ratio >= 0.4:
        flags.append(
            QualityFlag(
                code="high_missingness",
                column=name,
                severity=FlagSeverity.WARNING if null_ratio < 0.7 else FlagSeverity.CRITICAL,
                message=f"High missingness ({null_ratio:.0%})",
                detail="Missing values may bias aggregates and models if not handled.",
            )
        )

    if len(non_null) > 0 and non_null.nunique(dropna=True) == 1:
        flags.append(
            QualityFlag(
                code="constant_column",
                column=name,
                severity=FlagSeverity.WARNING,
                message="Constant column",
                detail="A single repeated value usually adds no analytical signal.",
            )
        )

    if inferred == ColumnType.IDENTIFIER:
        flags.append(
            QualityFlag(
                code="possible_identifier",
                column=name,
                severity=FlagSeverity.INFO,
                message="Looks like an identifier",
                detail="High uniqueness + naming hints suggest this should not be used as a model feature.",
            )
        )

    if inferred in {ColumnType.CATEGORICAL, ColumnType.TEXT} and unique_ratio >= 0.9 and len(non_null) >= 20:
        flags.append(
            QualityFlag(
                code="high_cardinality",
                column=name,
                severity=FlagSeverity.WARNING,
                message="Very high cardinality",
                detail="Almost every row has a distinct value; encoding or grouping may be required.",
            )
        )

    if numeric_stats and numeric_stats.skew is not None and abs(numeric_stats.skew) >= 2:
        flags.append(
            QualityFlag(
                code="high_skew",
                column=name,
                severity=FlagSeverity.INFO,
                message="Highly skewed distribution",
                detail=f"Skewness ≈ {numeric_stats.skew:.2f}. Consider transforms before modeling.",
            )
        )

    if numeric_stats and numeric_stats.outlier_ratio is not None and numeric_stats.outlier_ratio >= 0.08:
        flags.append(
            QualityFlag(
                code="many_outliers",
                column=name,
                severity=FlagSeverity.WARNING,
                message="Many numeric outliers",
                detail=f"About {numeric_stats.outlier_ratio:.0%} of values fall outside a 1.5×IQR fence.",
            )
        )

    if numeric_stats and numeric_stats.zero_ratio is not None and numeric_stats.zero_ratio >= 0.6:
        flags.append(
            QualityFlag(
                code="zero_dominance",
                column=name,
                severity=FlagSeverity.INFO,
                message="Zeros dominate the column",
                detail=f"{numeric_stats.zero_ratio:.0%} of numeric values are zero.",
            )
        )

    # Mixed parsing signal: many values fail numeric coercion while some succeed
    if inferred == ColumnType.TEXT:
        coerced = pd.to_numeric(non_null, errors="coerce")
        success_ratio = float(coerced.notna().mean()) if len(non_null) else 0.0
        if 0.15 <= success_ratio <= 0.85:
            flags.append(
                QualityFlag(
                    code="parse_inconsistency",
                    column=name,
                    severity=FlagSeverity.WARNING,
                    message="Possible mixed / dirty parsing",
                    detail="Some values look numeric and others do not — check separators, units, or typos.",
                )
            )

    return flags


def _score_from_flags(flags: list[QualityFlag], duplicate_ratio: float) -> tuple[int, HealthStatus, str]:
    score = 100
    for flag in flags:
        if flag.severity == FlagSeverity.CRITICAL:
            score -= 18
        elif flag.severity == FlagSeverity.WARNING:
            score -= 8
        else:
            score -= 3

    if duplicate_ratio >= 0.05:
        score -= 10
    elif duplicate_ratio > 0:
        score -= 4

    score = max(0, min(100, score))

    if score >= 80:
        status = HealthStatus.HEALTHY
        headline = "Dataset looks healthy enough to start analysis."
    elif score >= 50:
        status = HealthStatus.ATTENTION
        headline = "Dataset is usable, but several columns need attention first."
    else:
        status = HealthStatus.CRITICAL
        headline = "Dataset has critical quality risks — fix flagged columns before modeling."

    return score, status, headline


def profile_dataframe(df: pd.DataFrame, filename: str, preview_rows: int = 20) -> ProfileReport:
    if df.empty or df.shape[1] == 0:
        raise ValueError("Dataset is empty")

    working = df.copy()
    working.columns = [str(col).strip() or f"column_{idx}" for idx, col in enumerate(working.columns)]

    rows, cols = working.shape
    total_cells = rows * cols
    null_cells = int(working.isna().sum().sum())
    completeness = 1.0 - (null_cells / total_cells) if total_cells else 0.0
    duplicate_rows = int(working.duplicated().sum())
    duplicate_ratio = duplicate_rows / rows if rows else 0.0
    memory_mb = float(working.memory_usage(deep=True).sum() / (1024 * 1024))

    column_profiles: list[ColumnProfile] = []
    all_flags: list[QualityFlag] = []

    if duplicate_rows > 0:
        all_flags.append(
            QualityFlag(
                code="duplicate_rows",
                column=None,
                severity=FlagSeverity.WARNING if duplicate_ratio < 0.1 else FlagSeverity.CRITICAL,
                message=f"{duplicate_rows} duplicate rows ({duplicate_ratio:.1%})",
                detail="Duplicate rows can inflate counts and leak information into train/test splits.",
            )
        )

    for name in working.columns:
        series = working[name]
        inferred = infer_column_type(str(name), series)
        null_count = int(series.isna().sum())
        null_ratio = null_count / rows if rows else 0.0
        unique_count = int(series.nunique(dropna=True))
        unique_ratio = unique_count / rows if rows else 0.0
        sample_values = [
            None if pd.isna(value) else (value.item() if hasattr(value, "item") else value)
            for value in series.head(5).tolist()
        ]

        numeric_stats = None
        categorical_stats = None
        histogram = None

        if inferred == ColumnType.NUMERIC:
            numeric_stats, histogram = _numeric_stats(series)
        elif inferred in {ColumnType.CATEGORICAL, ColumnType.BOOLEAN, ColumnType.TEXT, ColumnType.IDENTIFIER}:
            categorical_stats = _categorical_stats(series)

        flags = _column_flags(str(name), series, inferred, null_ratio, unique_ratio, numeric_stats)
        all_flags.extend(flags)

        column_profiles.append(
            ColumnProfile(
                name=str(name),
                inferred_type=inferred,
                null_count=null_count,
                null_ratio=round(null_ratio, 4),
                unique_count=unique_count,
                unique_ratio=round(unique_ratio, 4),
                sample_values=sample_values,
                numeric_stats=numeric_stats,
                categorical_stats=categorical_stats,
                histogram=histogram,
                flags=flags,
            )
        )

    score, status, headline = _score_from_flags(all_flags, duplicate_ratio)

    preview_df = working.head(preview_rows).where(working.notna(), None)
    preview = preview_df.to_dict(orient="records")

    summary = DatasetSummary(
        filename=filename,
        rows=rows,
        columns=cols,
        completeness=round(completeness, 4),
        duplicate_rows=duplicate_rows,
        duplicate_ratio=round(duplicate_ratio, 4),
        memory_mb=round(memory_mb, 3),
        health_score=score,
        health_status=status,
        headline=headline,
    )

    # Stable ordering: critical columns first
    severity_rank = {FlagSeverity.CRITICAL: 0, FlagSeverity.WARNING: 1, FlagSeverity.INFO: 2}
    column_profiles.sort(
        key=lambda col: (
            min((severity_rank[f.severity] for f in col.flags), default=3),
            -col.null_ratio,
            col.name,
        )
    )
    all_flags.sort(key=lambda f: (severity_rank[f.severity], f.column or "", f.code))

    return ProfileReport(
        summary=summary,
        columns=column_profiles,
        flags=all_flags,
        preview=preview,
        methodology=METHODOLOGY,
    )
