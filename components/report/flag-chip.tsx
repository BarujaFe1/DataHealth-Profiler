import { DataFlag } from '@/lib/types';

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
  high_nulls: { bg: 'bg-[oklch(65%_0.18_45)]/10', text: 'text-[oklch(65%_0.18_45)]' },
  high_cardinality: { bg: 'bg-[oklch(75%_0.14_85)]/10', text: 'text-[oklch(75%_0.14_85)]' },
  low_cardinality: { bg: 'bg-[oklch(75%_0.14_85)]/10', text: 'text-[oklch(75%_0.14_85)]' },
  outliers_detected: { bg: 'bg-[oklch(65%_0.18_45)]/10', text: 'text-[oklch(65%_0.18_45)]' },
  type_mismatch: { bg: 'bg-[oklch(60%_0.2_25)]/10', text: 'text-[oklch(60%_0.2_25)]' },
  duplicate_values: { bg: 'bg-[oklch(75%_0.14_85)]/10', text: 'text-[oklch(75%_0.14_85)]' },
  skewed_distribution: { bg: 'bg-[oklch(75%_0.14_85)]/10', text: 'text-[oklch(75%_0.14_85)]' },
  constant_value: { bg: 'bg-[oklch(75%_0.14_85)]/10', text: 'text-[oklch(75%_0.14_85)]' },
  suspicious_pattern: { bg: 'bg-[oklch(60%_0.2_25)]/10', text: 'text-[oklch(60%_0.2_25)]' },
};

export default function FlagChip({ flag }: { flag: DataFlag }) {
  const colors = flagColors[flag];
  
  return (
    <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}>
      {flagLabels[flag]}
    </span>
  );
}
