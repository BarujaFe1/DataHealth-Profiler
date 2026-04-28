import { DataFlag } from '@/lib/types';
import { AlertCircle, TrendingUp, TrendingDown, Zap, AlertTriangle, Copy, BarChart3, Minus, Eye } from 'lucide-react';

const flagLabels: Record<DataFlag, string> = {
  high_nulls: 'High Nulls',
  high_cardinality: 'High Cardinality',
  low_cardinality: 'Low Cardinality',
  outliers_detected: 'Outliers',
  type_mismatch: 'Type Mismatch',
  duplicate_values: 'Duplicates',
  skewed_distribution: 'Skewed',
  constant_value: 'Constant',
  suspicious_pattern: 'Suspicious',
};

const flagColors: Record<DataFlag, { bg: string; text: string }> = {
  high_nulls: { bg: 'bg-[oklch(65%_0.18_45)]/12', text: 'text-[oklch(55%_0.18_45)]' },
  high_cardinality: { bg: 'bg-[oklch(75%_0.14_85)]/12', text: 'text-[oklch(60%_0.14_85)]' },
  low_cardinality: { bg: 'bg-[oklch(75%_0.14_85)]/12', text: 'text-[oklch(60%_0.14_85)]' },
  outliers_detected: { bg: 'bg-[oklch(65%_0.18_45)]/12', text: 'text-[oklch(55%_0.18_45)]' },
  type_mismatch: { bg: 'bg-[oklch(60%_0.2_25)]/12', text: 'text-[oklch(50%_0.2_25)]' },
  duplicate_values: { bg: 'bg-[oklch(75%_0.14_85)]/12', text: 'text-[oklch(60%_0.14_85)]' },
  skewed_distribution: { bg: 'bg-[oklch(75%_0.14_85)]/12', text: 'text-[oklch(60%_0.14_85)]' },
  constant_value: { bg: 'bg-[oklch(75%_0.14_85)]/12', text: 'text-[oklch(60%_0.14_85)]' },
  suspicious_pattern: { bg: 'bg-[oklch(60%_0.2_25)]/12', text: 'text-[oklch(50%_0.2_25)]' },
};

const flagIcons: Record<DataFlag, React.ComponentType<{ className?: string }>> = {
  high_nulls: AlertCircle,
  high_cardinality: TrendingUp,
  low_cardinality: TrendingDown,
  outliers_detected: Zap,
  type_mismatch: AlertTriangle,
  duplicate_values: Copy,
  skewed_distribution: BarChart3,
  constant_value: Minus,
  suspicious_pattern: Eye,
};

export default function FlagChip({ flag }: { flag: DataFlag }) {
  const colors = flagColors[flag];
  const Icon = flagIcons[flag];
  
  return (
    <span className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition-colors hover:opacity-80 ${colors.bg} ${colors.text}`}>
      <Icon className="h-3 w-3" />
      {flagLabels[flag]}
    </span>
  );
}
