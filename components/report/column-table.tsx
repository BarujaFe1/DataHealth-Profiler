'use client';

import { useState } from 'react';
import { ColumnProfile } from '@/lib/types';
import TypeBadge from './type-badge';
import NullBar from './null-bar';
import FlagChip from './flag-chip';
import { getHealthColor, formatNumber } from '@/lib/utils';
import { Columns, Hash, Activity } from 'lucide-react';

export default function ColumnTable({ 
  columns, 
  onColumnSelect 
}: { 
  columns: ColumnProfile[];
  onColumnSelect: (columnName: string) => void;
}) {
  const [sortBy, setSortBy] = useState<'health' | 'name'>('health');
  
  const sortedColumns = [...columns].sort((a, b) => {
    if (sortBy === 'health') {
      return a.healthScore - b.healthScore;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] shadow-[var(--shadow-md)]">
      <div className="border-b border-[var(--border-subtle)] px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">
            Column Analysis
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text-secondary)]">Sort by:</span>
            <button
              onClick={() => setSortBy('health')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                sortBy === 'health'
                  ? 'bg-[var(--teal-600)] text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--neutral-100)]'
              }`}
            >
              Health
            </button>
            <button
              onClick={() => setSortBy('name')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                sortBy === 'name'
                  ? 'bg-[var(--teal-600)] text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--neutral-100)]'
              }`}
            >
              Name
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]">
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                <div className="flex items-center gap-2">
                  <Columns className="h-3.5 w-3.5" />
                  Column
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                <div className="flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5" />
                  Health
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                Nulls
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                <div className="flex items-center gap-2">
                  <Hash className="h-3.5 w-3.5" />
                  Unique
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                Flags
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {sortedColumns.map((column) => (
              <tr
                key={column.name}
                onClick={() => onColumnSelect(column.name)}
                className="cursor-pointer transition-all duration-200 hover:bg-[var(--teal-50)] hover:shadow-sm"
              >
                <td className="px-6 py-6">
                  <div className="font-mono text-sm font-semibold text-[var(--text-primary)] truncate max-w-xs" title={column.name}>
                    {column.name}
                  </div>
                  {column.declaredType && (
                    <div className="mt-1 font-mono text-xs text-[var(--text-tertiary)]">
                      {column.declaredType}
                    </div>
                  )}
                </td>
                <td className="px-6 py-6">
                  <TypeBadge type={column.inferredType} />
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${getHealthColor(column.healthScore)}`}>
                      {column.healthScore}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <NullBar percentage={column.nullPercentage} />
                </td>
                <td className="px-6 py-6">
                  <div className="font-mono text-sm font-medium text-[var(--text-primary)]">
                    {formatNumber(column.uniqueCount)}
                  </div>
                  <div className="mt-1 text-xs text-[var(--text-tertiary)]">
                    {column.uniquePercentage.toFixed(2)}%
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex flex-wrap gap-1.5">
                    {column.flags.length > 0 ? (
                      column.flags.map((flag) => (
                        <FlagChip key={flag} flag={flag} />
                      ))
                    ) : (
                      <span className="text-xs text-[var(--text-tertiary)]">—</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <TypeBadge type={column.inferredType} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-lg font-semibold ${getHealthColor(column.healthScore)}`}>
                      {column.healthScore}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <NullBar percentage={column.nullPercentage} />
                </td>
                <td className="px-6 py-4">
                  <div className="font-mono text-sm text-[var(--text-primary)]">
                    {formatNumber(column.uniqueCount)}
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--text-tertiary)]">
                    {column.uniquePercentage.toFixed(2)}%
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {column.flags.length > 0 ? (
                      column.flags.map((flag) => (
                        <FlagChip key={flag} flag={flag} />
                      ))
                    ) : (
                      <span className="text-xs text-[var(--text-tertiary)]">None</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
