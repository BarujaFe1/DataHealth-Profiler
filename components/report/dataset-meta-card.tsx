import { DatasetSummary } from '@/lib/types';
import { formatBytes, formatNumber, formatDate } from '@/lib/utils';

export default function DatasetMetaCard({ 
  summary, 
  datasetName, 
  uploadedAt 
}: { 
  summary: DatasetSummary; 
  datasetName: string;
  uploadedAt: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-6 shadow-[var(--shadow-md)]">
      <div className="mb-4">
        <p className="text-sm font-medium text-[var(--text-secondary)]">
          Dataset
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] break-all">
          {datasetName}
        </h3>
        <p className="mt-1 text-xs text-[var(--text-tertiary)]">
          {formatDate(uploadedAt)}
        </p>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--text-secondary)]">Rows</span>
          <span className="font-mono text-sm font-medium text-[var(--text-primary)]">
            {formatNumber(summary.rowCount)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--text-secondary)]">Columns</span>
          <span className="font-mono text-sm font-medium text-[var(--text-primary)]">
            {formatNumber(summary.columnCount)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--text-secondary)]">File Size</span>
          <span className="font-mono text-sm font-medium text-[var(--text-primary)]">
            {formatBytes(summary.fileSizeBytes)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--text-secondary)]">Memory</span>
          <span className="font-mono text-sm font-medium text-[var(--text-primary)]">
            {summary.memoryUsageMB.toFixed(1)} MB
          </span>
        </div>
      </div>
    </div>
  );
}
