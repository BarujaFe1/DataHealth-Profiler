export default function ErrorState({ 
  message, 
  onRetry 
}: { 
  message: string; 
  onRetry: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-[oklch(60%_0.2_25)]/12 border-2 border-[oklch(60%_0.2_25)]/30">
          <svg
            className="h-10 w-10 text-[oklch(60%_0.2_25)]"
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
        </div>
        <h2 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">
          Processing failed
        </h2>
        <p className="mb-8 text-base text-[var(--text-secondary)] leading-relaxed">
          {message}
        </p>
        <button
          onClick={onRetry}
          className="rounded-lg bg-[var(--interactive-primary)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--interactive-primary-hover)] hover:shadow-md active:scale-95"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
