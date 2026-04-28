export default function EmptyState() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--teal-50)] border-2 border-[var(--teal-200)]">
          <svg
            className="h-10 w-10 text-[var(--teal-600)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
        </div>
        <h2 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">
          No dataset loaded
        </h2>
        <p className="text-base text-[var(--text-secondary)] leading-relaxed">
          Upload a CSV file or try the demo dataset to get started with your data health analysis
        </p>
      </div>
    </div>
  );
}
