export default function InsightNote({ insights }: { insights: string[] }) {
  if (!insights || insights.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-4">
      <div className="mb-3 flex items-center gap-2">
        <svg
          className="h-4 w-4 text-[var(--teal-600)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h4 className="text-xs font-semibold text-[var(--text-primary)]">
          Insights
        </h4>
      </div>
      <ul className="space-y-2">
        {insights.map((insight, index) => (
          <li key={index} className="flex gap-2 text-sm text-[var(--text-secondary)]">
            <span className="text-[var(--text-tertiary)]">•</span>
            <span>{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
