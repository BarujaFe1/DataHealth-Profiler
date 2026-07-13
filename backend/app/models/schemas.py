from __future__ import annotations

from enum import Enum
from typing import Any, Literal

from pydantic import BaseModel, Field


class ColumnType(str, Enum):
    NUMERIC = "numeric"
    CATEGORICAL = "categorical"
    DATETIME = "datetime"
    BOOLEAN = "boolean"
    IDENTIFIER = "identifier"
    TEXT = "text"
    UNKNOWN = "unknown"


class FlagSeverity(str, Enum):
    INFO = "info"
    WARNING = "warning"
    CRITICAL = "critical"


class HealthStatus(str, Enum):
    HEALTHY = "healthy"
    ATTENTION = "attention"
    CRITICAL = "critical"


class QualityFlag(BaseModel):
    code: str
    column: str | None = None
    severity: FlagSeverity
    message: str
    detail: str | None = None


class NumericStats(BaseModel):
    count: int
    mean: float | None = None
    std: float | None = None
    min: float | None = None
    q25: float | None = None
    median: float | None = None
    q75: float | None = None
    max: float | None = None
    skew: float | None = None
    zero_ratio: float | None = None
    outlier_ratio: float | None = None


class CategoricalStats(BaseModel):
    top_values: list[dict[str, Any]] = Field(default_factory=list)


class ColumnProfile(BaseModel):
    name: str
    inferred_type: ColumnType
    null_count: int
    null_ratio: float
    unique_count: int
    unique_ratio: float
    sample_values: list[Any] = Field(default_factory=list)
    numeric_stats: NumericStats | None = None
    categorical_stats: CategoricalStats | None = None
    histogram: list[dict[str, float | int]] | None = None
    flags: list[QualityFlag] = Field(default_factory=list)


class DatasetSummary(BaseModel):
    filename: str
    rows: int
    columns: int
    completeness: float
    duplicate_rows: int
    duplicate_ratio: float
    memory_mb: float
    health_score: int = Field(ge=0, le=100)
    health_status: HealthStatus
    headline: str


class ProfileReport(BaseModel):
    summary: DatasetSummary
    columns: list[ColumnProfile]
    flags: list[QualityFlag]
    preview: list[dict[str, Any]]
    methodology: list[str]


class DemoDataset(BaseModel):
    id: str
    name: str
    description: str
    filename: str
    rows: int | None = None
    columns: int | None = None


class ErrorResponse(BaseModel):
    error: str
    code: Literal[
        "INVALID_FILE",
        "FILE_TOO_LARGE",
        "PARSE_ERROR",
        "TOO_MANY_ROWS",
        "EMPTY_DATASET",
        "DEMO_NOT_FOUND",
        "INTERNAL_ERROR",
    ]
    detail: str | None = None
