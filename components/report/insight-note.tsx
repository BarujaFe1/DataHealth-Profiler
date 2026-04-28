export default function InsightNote({ insights }: { insights: string[] }) {
  if (!insights || insights.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-[var(--teal-200)] bg-[var(--teal-50)] p-6">
      <div className="mb-4 flex items-center gap-3">
        <svg
          className="h-5 w-5 text-[var(--teal-600)]"
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
        <h4 className="text-sm font-semibold text-[var(--text-primary)]">
          Insights
        </h4>
      </div>
      <ul className="space-y-3">
        {insights.map((insight, index) => (
          <li key={index} className="flex gap-3 text-sm text-[var(--text-secondary)]">
            <span className="text-[var(--teal-600)] font-bold">•</span>
            <span className="leading-relaxed">{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
