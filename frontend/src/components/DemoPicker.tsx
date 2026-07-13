"use client";

import type { DemoDataset } from "@/lib/types";

interface DemoPickerProps {
  demos: DemoDataset[];
  loading?: boolean;
  disabled?: boolean;
  onSelect: (demoId: string) => void;
}

export function DemoPicker({ demos, loading, disabled, onSelect }: DemoPickerProps) {
  if (loading) {
    return (
      <div className="demo-grid" aria-busy="true">
        {[0, 1, 2].map((item) => (
          <div key={item} className="skeleton demo-card-skeleton" />
        ))}
      </div>
    );
  }

  if (!demos.length) {
    return (
      <p className="muted">
        Demo datasets are unavailable. Start the API and refresh.
      </p>
    );
  }

  return (
    <div className="demo-grid">
      {demos.map((demo) => (
        <button
          key={demo.id}
          type="button"
          className="demo-card"
          disabled={disabled}
          onClick={() => onSelect(demo.id)}
        >
          <span className="demo-name">{demo.name}</span>
          <span className="demo-desc">{demo.description}</span>
          <span className="demo-meta">
            {demo.rows ?? "—"} rows · {demo.columns ?? "—"} columns
          </span>
        </button>
      ))}
    </div>
  );
}
