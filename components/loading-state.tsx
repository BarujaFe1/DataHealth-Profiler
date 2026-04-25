export default function LoadingState({ fileName }: { fileName: string }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--neutral-200)] border-t-[var(--teal-600)]" />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-[var(--text-primary)]">
          Analyzing dataset
        </h2>
        <p className="text-sm text-[var(--text-secondary)]">
          Processing {fileName}...
        </p>
      </div>
    </div>
  );
}
