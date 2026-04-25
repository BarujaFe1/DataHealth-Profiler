import { TopValue } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

export default function TopValuesPanel({ topValues }: { topValues: TopValue[] }) {
  if (!topValues || topValues.length === 0) {
    return (
      <div className="text-sm text-[var(--text-tertiary)]">
        No top values available
      </div>
    );
  }

  const maxCount = Math.max(...topValues.map(v => v.count));

  return (
    <div className="space-y-3">
      {topValues.map((item, index) => (
        <div key={index}>
          <div className="mb-1 flex items-center justify-between">
            <span className="font-mono text-sm text-[var(--text-primary)]">
              {item.value}
            </span>
            <span className="text-xs text-[var(--text-secondary)]">
              {formatNumber(item.count)} ({item.percentage.toFixed(2)}%)
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[var(--neutral-200)]">
            <div
              className="h-full bg-[var(--teal-600)] transition-all"
              style={{ width: `${(item.count / maxCount) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
