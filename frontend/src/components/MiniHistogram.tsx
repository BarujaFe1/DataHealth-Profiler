interface MiniHistogramProps {
  bins: Array<{ bin_start: number; bin_end: number; count: number }>;
}

export function MiniHistogram({ bins }: MiniHistogramProps) {
  const max = Math.max(...bins.map((bin) => bin.count), 1);

  return (
    <div className="histogram" role="img" aria-label="Numeric distribution histogram">
      {bins.map((bin) => (
        <div key={`${bin.bin_start}-${bin.bin_end}`} className="histogram-bar-wrap" title={`${bin.bin_start.toFixed(2)} – ${bin.bin_end.toFixed(2)}: ${bin.count}`}>
          <div
            className="histogram-bar"
            style={{ height: `${Math.max(8, (bin.count / max) * 100)}%` }}
          />
        </div>
      ))}
    </div>
  );
}
