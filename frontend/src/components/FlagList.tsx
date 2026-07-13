import type { QualityFlag } from "@/lib/types";
import { severityTone } from "@/lib/format";

interface FlagListProps {
  flags: QualityFlag[];
}

export function FlagList({ flags }: FlagListProps) {
  if (!flags.length) {
    return (
      <div className="empty-flags">
        <p>No quality flags fired. The dataset looks clean on V1 rules.</p>
      </div>
    );
  }

  return (
    <ul className="flag-list">
      {flags.map((flag) => (
        <li key={`${flag.code}-${flag.column ?? "dataset"}-${flag.message}`} className={`flag-item ${severityTone(flag.severity)}`}>
          <div className="flag-top">
            <span className="flag-severity">{flag.severity}</span>
            <strong>{flag.message}</strong>
          </div>
          <p className="muted">
            {flag.column ? `Column: ${flag.column}` : "Dataset-level"}
            {flag.detail ? ` · ${flag.detail}` : ""}
          </p>
        </li>
      ))}
    </ul>
  );
}
