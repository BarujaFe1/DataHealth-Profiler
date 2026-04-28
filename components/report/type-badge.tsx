import { InferredType } from '@/lib/types';
import { Hash, Type, ToggleLeft, Calendar, Tag, HelpCircle } from 'lucide-react';

const typeColors: Record<InferredType, { bg: string; text: string }> = {
  integer: { bg: 'bg-[oklch(75%_0.08_195)]/15', text: 'text-[oklch(40%_0.1_195)]' },
  float: { bg: 'bg-[oklch(75%_0.08_195)]/15', text: 'text-[oklch(40%_0.1_195)]' },
  string: { bg: 'bg-[oklch(75%_0.14_85)]/15', text: 'text-[oklch(42%_0.15_85)]' },
  boolean: { bg: 'bg-[oklch(80%_0.12_120)]/15', text: 'text-[oklch(40%_0.15_120)]' },
  date: { bg: 'bg-[oklch(75%_0.1_280)]/15', text: 'text-[oklch(40%_0.12_280)]' },
  datetime: { bg: 'bg-[oklch(75%_0.1_280)]/15', text: 'text-[oklch(40%_0.12_280)]' },
  categorical: { bg: 'bg-[oklch(75%_0.14_85)]/15', text: 'text-[oklch(42%_0.15_85)]' },
  mixed: { bg: 'bg-[oklch(70%_0.012_85)]/30', text: 'text-[oklch(42%_0.015_85)]' },
  unknown: { bg: 'bg-[oklch(70%_0.012_85)]/30', text: 'text-[oklch(42%_0.015_85)]' },
};

const typeIcons: Record<InferredType, React.ComponentType<{ className?: string }>> = {
  integer: Hash,
  float: Hash,
  string: Type,
  boolean: ToggleLeft,
  date: Calendar,
  datetime: Calendar,
  categorical: Tag,
  mixed: HelpCircle,
  unknown: HelpCircle,
};

export default function TypeBadge({ type }: { type: InferredType }) {
  const colors = typeColors[type];
  const Icon = typeIcons[type];
  
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}>
      <Icon className="h-3 w-3" />
      {type}
    </span>
  );
}
