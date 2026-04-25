'use client';

import { useState } from 'react';
import { ColumnProfile } from '@/lib/types';
import TypeBadge from './type-badge';
import NullBar from './null-bar';
import FlagChip from './flag-chip';
import { getHealthColor, formatNumber } from '@/lib/utils';

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
              className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                sortBy === 'health'
                  ? 'bg-[var(--teal-600)] text-white'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--neutral-100)]'
              }`}
            >
              Health
            </button>
            <button
              onClick={() => setSortBy('name')}
              className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                sortBy === 'name'
                  ? 'bg-[var(--teal-600)] text-white'
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
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)]">
                Column
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)]">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)]">
                Health
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)]">
                Nulls
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)]">
                Unique
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)]">
                Flags
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {sortedColumns.map((column) => (
              <tr
                key={column.name}
                onClick={() => onColumnSelect(column.name)}
                className="cursor-pointer transition-colors hover:bg-[var(--surface-sunken)]"
              >
                <td className="px-6 py-4">
                  <div className="font-mono text-sm font-medium text-[var(--text-primary)]">
                    {column.name}
                  </div>
                  {column.declaredType && (
                    <div className="mt-0.5 font-mono text-xs text-[var(--text-tertiary)]">
                      {column.declaredType}
                    </div>
                  )}
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
