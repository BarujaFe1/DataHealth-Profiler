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
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl overflow-y-auto bg-[var(--surface-overlay)] shadow-[var(--shadow-xl)] scroll-smooth">
        <div className="sticky top-0 z-10 border-b-2 border-[var(--border-subtle)] bg-[var(--surface-raised)] px-8 py-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="font-mono text-2xl font-bold text-[var(--text-primary)]">
                {column.name}
              </h2>
              {column.declaredType && (
                <p className="mt-2 font-mono text-sm text-[var(--text-tertiary)]">
                  {column.declaredType}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2.5 text-[var(--text-secondary)] transition-all hover:bg-[var(--neutral-100)] hover:text-[var(--text-primary)]"
            >
              <svg
                className="h-6 w-6"
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

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-6">
              <div className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide">Health Score</div>
              <div className={`mt-3 text-4xl font-bold ${getHealthColor(column.healthScore)}`}>
                {column.healthScore}
              </div>
              <div className="mt-2 text-sm font-medium text-[var(--text-secondary)]">
                {getHealthLabel(column.healthScore)}
              </div>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-6">
              <div className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide">Type</div>
              <div className="mt-3">
                <TypeBadge type={column.inferredType} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-6">
            <h3 className="mb-5 text-base font-semibold text-[var(--text-primary)]">
              Statistics
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <span className="text-sm font-medium text-[var(--text-secondary)]">Unique Values</span>
                <div className="text-right">
                  <div className="font-mono text-sm font-semibold text-[var(--text-primary)]">
                    {formatNumber(column.uniqueCount)}
                  </div>
                  <div className="text-xs text-[var(--text-tertiary)]">
                    {column.uniquePercentage.toFixed(2)}%
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <span className="text-sm font-medium text-[var(--text-secondary)]">Null Values</span>
                <div className="text-right">
                  <NullBar percentage={column.nullPercentage} />
                </div>
              </div>
            </div>
          </div>

          {column.numericStats && (
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-6">
              <h3 className="mb-5 text-base font-semibold text-[var(--text-primary)]">
                Numeric Statistics
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <div className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide">Mean</div>
                  <div className="mt-2 font-mono text-base font-semibold text-[var(--text-primary)]">
                    {column.numericStats.mean.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide">Median</div>
                  <div className="mt-2 font-mono text-base font-semibold text-[var(--text-primary)]">
                    {column.numericStats.median.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide">Std Dev</div>
                  <div className="mt-2 font-mono text-base font-semibold text-[var(--text-primary)]">
                    {column.numericStats.stdDev.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide">Min</div>
                  <div className="mt-2 font-mono text-base font-semibold text-[var(--text-primary)]">
                    {column.numericStats.min.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide">Max</div>
                  <div className="mt-2 font-mono text-base font-semibold text-[var(--text-primary)]">
                    {column.numericStats.max.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide">Q25</div>
                  <div className="mt-2 font-mono text-base font-semibold text-[var(--text-primary)]">
                    {column.numericStats.q25.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide">Q75</div>
                  <div className="mt-2 font-mono text-base font-semibold text-[var(--text-primary)]">
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
