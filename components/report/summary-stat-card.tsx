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
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--teal-50)]">
        {icon}
      </div>
      <div className="text-2xl font-semibold text-[var(--text-primary)]">
        {value}
      </div>
      <div className="mt-2 text-sm font-medium text-[var(--text-secondary)]">
        {label}
      </div>
    </div>
  );
}
