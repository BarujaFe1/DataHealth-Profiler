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
    <div className="space-y-4">
      {topValues.map((item, index) => (
        <div key={index}>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-sm font-semibold text-[var(--text-primary)] truncate max-w-xs">
              {item.value}
            </span>
            <span className="text-xs font-medium text-[var(--text-secondary)] ml-2">
              {formatNumber(item.count)} ({item.percentage.toFixed(2)}%)
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[var(--neutral-200)]">
            <div
              className="h-full bg-[var(--teal-600)] transition-all duration-300"
              style={{ width: `${(item.count / maxCount) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
