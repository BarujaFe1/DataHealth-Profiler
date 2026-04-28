import { HealthScore } from '@/lib/types';
import { getHealthColor, getHealthLabel } from '@/lib/utils';

export default function HealthScoreCard({ health }: { health: HealthScore }) {
  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-6 shadow-[var(--shadow-md)]">
      <div className="mb-5">
        <p className="text-sm font-medium text-[var(--text-secondary)]">
          Overall Health
        </p>
      </div>
      <div className="flex items-end gap-3">
        <div className={`text-6xl font-semibold ${getHealthColor(health.overall)}`}>
          {health.overall}
        </div>
        <div className="mb-2 text-lg text-[var(--text-secondary)]">
          / 100
        </div>
      </div>
      <div className="mt-3">
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          {getHealthLabel(health.overall)}
        </span>
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <span className="text-xs font-medium text-[var(--text-secondary)]">Completeness</span>
          <span className="text-sm font-semibold text-[var(--text-primary)]">{health.completeness}</span>
        </div>
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <span className="text-xs font-medium text-[var(--text-secondary)]">Consistency</span>
          <span className="text-sm font-semibold text-[var(--text-primary)]">{health.consistency}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[var(--text-secondary)]">Validity</span>
          <span className="text-sm font-semibold text-[var(--text-primary)]">{health.validity}</span>
        </div>
      </div>
    </div>
  );
}
