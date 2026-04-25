'use client';

export default function DemoDatasetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-4 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--interactive-secondary)]"
    >
      Try Demo Dataset
    </button>
  );
}
