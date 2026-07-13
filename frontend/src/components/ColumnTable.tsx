"use client";

import type { ColumnProfile } from "@/lib/types";
import { formatPercent } from "@/lib/format";

interface ColumnTableProps {
  columns: ColumnProfile[];
  selected?: string | null;
  onSelect: (name: string) => void;
}

export function ColumnTable({ columns, selected, onSelect }: ColumnTableProps) {
  return (
    <div className="table-wrap" role="region" aria-label="Column profiles">
      <table className="column-table">
        <thead>
          <tr>
            <th scope="col">Column</th>
            <th scope="col">Type</th>
            <th scope="col">Nulls</th>
            <th scope="col">Unique</th>
            <th scope="col">Flags</th>
          </tr>
        </thead>
        <tbody>
          {columns.map((column) => {
            const worst = column.flags[0]?.severity;
            return (
              <tr
                key={column.name}
                className={selected === column.name ? "is-selected" : ""}
                onClick={() => onSelect(column.name)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelect(column.name);
                  }
                }}
                tabIndex={0}
                aria-selected={selected === column.name}
              >
                <td>
                  <span className="col-name">{column.name}</span>
                </td>
                <td>
                  <span className="type-chip">{column.inferred_type}</span>
                </td>
                <td>{formatPercent(column.null_ratio)}</td>
                <td>
                  {column.unique_count}{" "}
                  <span className="muted">({formatPercent(column.unique_ratio)})</span>
                </td>
                <td>
                  {column.flags.length ? (
                    <span className={`flag-count ${worst ?? "info"}`}>
                      {column.flags.length}
                    </span>
                  ) : (
                    <span className="muted">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
