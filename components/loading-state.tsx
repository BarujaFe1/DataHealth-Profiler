export default function LoadingState({ fileName }: { fileName: string }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-[var(--teal-100)] border-t-[var(--teal-600)]" />
        </div>
        <h2 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">
          Analyzing dataset
        </h2>
        <p className="text-base text-[var(--text-secondary)] leading-relaxed">
          Processing <span className="font-mono font-semibold text-[var(--text-primary)]">{fileName}</span>
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-[var(--teal-600)]" style={{ animationDelay: '0ms' }} />
          <div className="h-2 w-2 animate-pulse rounded-full bg-[var(--teal-600)]" style={{ animationDelay: '150ms' }} />
          <div className="h-2 w-2 animate-pulse rounded-full bg-[var(--teal-600)]" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
