export function LoadingSkeleton() {
  return (
    <div className="loading-panel" aria-busy="true" aria-live="polite">
      <div className="skeleton score-skeleton" />
      <div className="skeleton line-skeleton" />
      <div className="skeleton line-skeleton short" />
      <div className="skeleton table-skeleton" />
      <p className="muted">Profiling dataset…</p>
    </div>
  );
}
