export interface ProfileReport {
  datasetName: string;
  uploadedAt: string;
  summary: DatasetSummary;
  columns: ColumnProfile[];
  overallHealth: HealthScore;
  attentionItems: AttentionItem[];
}

export interface DatasetSummary {
  rowCount: number;
  columnCount: number;
  fileSizeBytes: number;
  memoryUsageMB: number;
}

export interface ColumnProfile {
  name: string;
  inferredType: InferredType;
  declaredType?: string;
  nullCount: number;
  nullPercentage: number;
  uniqueCount: number;
  uniquePercentage: number;
  healthScore: number;
  flags: DataFlag[];
  numericStats?: NumericStats;
  distribution?: Distribution;
  topValues?: TopValue[];
  insights: string[];
}

export interface NumericStats {
  mean: number;
  median: number;
  stdDev: number;
  min: number;
  max: number;
  q25: number;
  q75: number;
}

export interface Distribution {
  bins: number[];
  counts: number[];
}

export interface TopValue {
  value: string;
  count: number;
  percentage: number;
}

export type InferredType = 
  | 'integer'
  | 'float'
  | 'string'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'categorical'
  | 'mixed'
  | 'unknown';

export type DataFlag =
  | 'high_nulls'
  | 'high_cardinality'
  | 'low_cardinality'
  | 'outliers_detected'
  | 'type_mismatch'
  | 'duplicate_values'
  | 'skewed_distribution'
  | 'constant_value'
  | 'suspicious_pattern';

export interface HealthScore {
  overall: number;
  completeness: number;
  consistency: number;
  validity: number;
}

export interface AttentionItem {
  severity: 'critical' | 'warning' | 'info';
  columnName: string;
  message: string;
}

export type AppState = 
  | { status: 'idle' }
  | { status: 'uploading'; fileName: string }
  | { status: 'processing'; fileName: string }
  | { status: 'success'; report: ProfileReport }
  | { status: 'error'; message: string };

export type AppAction =
  | { type: 'UPLOAD_START'; fileName: string }
  | { type: 'UPLOAD_COMPLETE' }
  | { type: 'PROCESS_SUCCESS'; report: ProfileReport }
  | { type: 'PROCESS_ERROR'; message: string }
  | { type: 'RESET' };
