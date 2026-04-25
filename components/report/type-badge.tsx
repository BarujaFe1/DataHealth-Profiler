import { InferredType } from '@/lib/types';

const typeColors: Record<InferredType, { bg: string; text: string }> = {
  integer: { bg: 'bg-[oklch(75%_0.08_195)]/20', text: 'text-[oklch(40%_0.1_195)]' },
  float: { bg: 'bg-[oklch(75%_0.08_195)]/20', text: 'text-[oklch(40%_0.1_195)]' },
  string: { bg: 'bg-[oklch(75%_0.14_85)]/20', text: 'text-[oklch(42%_0.15_85)]' },
  boolean: { bg: 'bg-[oklch(80%_0.12_120)]/20', text: 'text-[oklch(40%_0.15_120)]' },
  date: { bg: 'bg-[oklch(75%_0.1_280)]/20', text: 'text-[oklch(40%_0.12_280)]' },
  datetime: { bg: 'bg-[oklch(75%_0.1_280)]/20', text: 'text-[oklch(40%_0.12_280)]' },
  categorical: { bg: 'bg-[oklch(75%_0.14_85)]/20', text: 'text-[oklch(42%_0.15_85)]' },
  mixed: { bg: 'bg-[oklch(70%_0.012_85)]/40', text: 'text-[oklch(42%_0.015_85)]' },
  unknown: { bg: 'bg-[oklch(70%_0.012_85)]/40', text: 'text-[oklch(42%_0.015_85)]' },
};

export default function TypeBadge({ type }: { type: InferredType }) {
  const colors = typeColors[type];
  
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}>
      {type}
    </span>
  );
}
