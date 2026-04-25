export default function EmptyState() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--neutral-100)]">
          <svg
            className="h-8 w-8 text-[var(--text-tertiary)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-semibold text-[var(--text-primary)]">
          No dataset loaded
        </h2>
        <p className="text-sm text-[var(--text-secondary)]">
          Upload a CSV file or try the demo dataset to get started
        </p>
      </div>
    </div>
  );
}
