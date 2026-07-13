# Data model (V1)

## ProfileReport

Top-level response returned by profiling endpoints.

| Field | Type | Notes |
|-------|------|-------|
| summary | DatasetSummary | Dataset-level metrics + score |
| columns | ColumnProfile[] | Per-column diagnostics |
| flags | QualityFlag[] | Flat list (dataset + column) |
| preview | object[] | First N parsed rows |
| methodology | string[] | Human explanations |

## DatasetSummary

`filename`, `rows`, `columns`, `completeness`, `duplicate_rows`, `duplicate_ratio`, `memory_mb`, `health_score` (0–100), `health_status` (`healthy` \| `attention` \| `critical`), `headline`.

## ColumnProfile

`name`, `inferred_type`, null/unique metrics, `sample_values`, optional `numeric_stats` / `categorical_stats` / `histogram`, `flags`.

## QualityFlag

`code`, optional `column`, `severity`, `message`, optional `detail`.

No persistence models in V1 — reports exist only in the request/response lifecycle.
