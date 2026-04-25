import { AttentionItem } from '@/lib/types';
import { getSeverityColor, getSeverityBgColor } from '@/lib/utils';

export default function AttentionCallout({ items }: { items: AttentionItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-6 shadow-[var(--shadow-md)]">
      <div className="mb-4 flex items-center gap-2">
        <svg
          className="h-5 w-5 text-[oklch(65%_0.18_45)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Attention Required
        </h3>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex gap-3">
            <div className={`mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${getSeverityBgColor(item.severity)}`} />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-medium text-[var(--text-primary)]">
                  {item.columnName}
                </span>
                <span className={`text-xs font-medium uppercase ${getSeverityColor(item.severity)}`}>
                  {item.severity}
                </span>
              </div>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {item.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
