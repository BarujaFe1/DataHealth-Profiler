export type ColumnType =
  | "numeric"
  | "categorical"
  | "datetime"
  | "boolean"
  | "identifier"
  | "text"
  | "unknown";

export type FlagSeverity = "info" | "warning" | "critical";
export type HealthStatus = "healthy" | "attention" | "critical";

export interface QualityFlag {
  code: string;
  column: string | null;
  severity: FlagSeverity;
  message: string;
  detail?: string | null;
}

export interface NumericStats {
  count: number;
  mean?: number | null;
  std?: number | null;
  min?: number | null;
  q25?: number | null;
  median?: number | null;
  q75?: number | null;
  max?: number | null;
  skew?: number | null;
  zero_ratio?: number | null;
  outlier_ratio?: number | null;
}

export interface CategoricalStats {
  top_values: Array<{ value: string; count: number }>;
}

export interface ColumnProfile {
  name: string;
  inferred_type: ColumnType;
  null_count: number;
  null_ratio: number;
  unique_count: number;
  unique_ratio: number;
  sample_values: unknown[];
  numeric_stats?: NumericStats | null;
  categorical_stats?: CategoricalStats | null;
  histogram?: Array<{ bin_start: number; bin_end: number; count: number }> | null;
  flags: QualityFlag[];
}

export interface DatasetSummary {
  filename: string;
  rows: number;
  columns: number;
  completeness: number;
  duplicate_rows: number;
  duplicate_ratio: number;
  memory_mb: number;
  health_score: number;
  health_status: HealthStatus;
  headline: string;
}

export interface ProfileReport {
  summary: DatasetSummary;
  columns: ColumnProfile[];
  flags: QualityFlag[];
  preview: Array<Record<string, unknown>>;
  methodology: string[];
}

export interface DemoDataset {
  id: string;
  name: string;
  description: string;
  filename: string;
  rows?: number | null;
  columns?: number | null;
}

export interface ApiErrorBody {
  error: string;
  code: string;
  detail?: string | null;
}
