'use client';

import { ColumnProfile } from '@/lib/types';
import TypeBadge from './type-badge';
import FlagChip from './flag-chip';
import NullBar from './null-bar';
import HistogramPanel from './histogram-panel';
import TopValuesPanel from './top-values-panel';
import InsightNote from './insight-note';
import { getHealthColor, getHealthLabel, formatNumber } from '@/lib/utils';

export default function ColumnDetailDrawer({
  column,
  isOpen,
  onClose,
}: {
  column: ColumnProfile | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !column) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl overflow-y-auto bg-[var(--surface-overlay)] shadow-[var(--shadow-xl)]">
        <div className="sticky top-0 z-10 border-b border-[var(--border-subtle)] bg-[var(--surface-raised)] px-6 py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="font-mono text-xl font-semibold text-[var(--text-primary)]">
                {column.name}
              </h2>
              {column.declaredType && (
                <p className="mt-1 font-mono text-sm text-[var(--text-tertiary)]">
                  {column.declaredType}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--neutral-100)]"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4">
              <div className="text-xs text-[var(--text-secondary)]">Health Score</div>
              <div className={`mt-2 text-3xl font-semibold ${getHealthColor(column.healthScore)}`}>
                {column.healthScore}
              </div>
              <div className="mt-1 text-sm text-[var(--text-secondary)]">
                {getHealthLabel(column.healthScore)}
              </div>
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4">
              <div className="text-xs text-[var(--text-secondary)]">Type</div>
              <div className="mt-2">
                <TypeBadge type={column.inferredType} />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4">
            <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
              Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">Null Values</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-[var(--text-primary)]">
                    {formatNumber(column.nullCount)}
                  </span>
                  <NullBar percentage={column.nullPercentage} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">Unique Values</span>
                <div className="text-right">
                  <div className="font-mono text-sm text-[var(--text-primary)]">
                    {formatNumber(column.uniqueCount)}
                  </div>
                  <div className="text-xs text-[var(--text-tertiary)]">
                    {column.uniquePercentage.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {column.numericStats && (
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4">
              <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
                Numeric Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-[var(--text-secondary)]">Mean</div>
                  <div className="mt-1 font-mono text-sm text-[var(--text-primary)]">
                    {column.numericStats.mean.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[var(--text-secondary)]">Median</div>
                  <div className="mt-1 font-mono text-sm text-[var(--text-primary)]">
                    {column.numericStats.median.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[var(--text-secondary)]">Std Dev</div>
                  <div className="mt-1 font-mono text-sm text-[var(--text-primary)]">
                    {column.numericStats.stdDev.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[var(--text-secondary)]">Min / Max</div>
                  <div className="mt-1 font-mono text-sm text-[var(--text-primary)]">
                    {column.numericStats.min.toFixed(2)} / {column.numericStats.max.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[var(--text-secondary)]">Q25</div>
                  <div className="mt-1 font-mono text-sm text-[var(--text-primary)]">
                    {column.numericStats.q25.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[var(--text-secondary)]">Q75</div>
                  <div className="mt-1 font-mono text-sm text-[var(--text-primary)]">
                    {column.numericStats.q75.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {column.distribution && (
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4">
              <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
                Distribution
              </h3>
              <HistogramPanel distribution={column.distribution} />
            </div>
          )}

          {column.topValues && column.topValues.length > 0 && (
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4">
              <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
                Top Values
              </h3>
              <TopValuesPanel topValues={column.topValues} />
            </div>
          )}

          {column.flags.length > 0 && (
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4">
              <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
                Data Quality Flags
              </h3>
              <div className="flex flex-wrap gap-2">
                {column.flags.map((flag) => (
                  <FlagChip key={flag} flag={flag} />
                ))}
              </div>
            </div>
          )}

          {column.insights.length > 0 && (
            <InsightNote insights={column.insights} />
          )}
        </div>
      </div>
    </>
  );
}
