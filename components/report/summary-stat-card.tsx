export default function SummaryStatCard({ 
  label, 
  value, 
  icon 
}: { 
  label: string; 
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-6 shadow-[var(--shadow-md)]">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--neutral-100)]">
        {icon}
      </div>
      <div className="text-2xl font-semibold text-[var(--text-primary)]">
        {value}
      </div>
      <div className="mt-1 text-sm text-[var(--text-secondary)]">
        {label}
      </div>
    </div>
  );
}
