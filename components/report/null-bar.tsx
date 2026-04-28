export default function NullBar({ percentage }: { percentage: number }) {
  const width = Math.min(percentage, 100);
  
  let barColor = 'bg-[oklch(75%_0.15_145)]';
  if (percentage > 50) barColor = 'bg-[oklch(60%_0.2_25)]';
  else if (percentage > 20) barColor = 'bg-[oklch(65%_0.18_45)]';
  else if (percentage > 5) barColor = 'bg-[oklch(75%_0.14_85)]';
  
  return (
    <div className="flex items-center gap-2.5">
      <div className="h-2 w-24 overflow-hidden rounded-full bg-[var(--neutral-200)]">
        <div 
          className={`h-full transition-all duration-300 ${barColor}`}
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="font-mono text-xs font-medium text-[var(--text-secondary)] min-w-[3rem]">
        {percentage.toFixed(1)}%
      </span>
    </div>
  );
}
