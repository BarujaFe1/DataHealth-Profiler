import type { DatasetSummary } from "@/lib/types";
import { formatNumber, formatPercent, healthTone } from "@/lib/format";

interface HealthSummaryProps {
  summary: DatasetSummary;
}

export function HealthSummary({ summary }: HealthSummaryProps) {
  return (
    <section className="summary-panel" aria-label="Dataset health summary">
      <div className="score-block">
        <div
          className="score-ring"
          style={{ ["--score-color" as string]: healthTone(summary.health_status) }}
          aria-label={`Health score ${summary.health_score}`}
        >
          <strong>{summary.health_score}</strong>
          <span>score</span>
        </div>
        <div>
          <p className={`status-pill status-${summary.health_status}`}>
            {summary.health_status}
          </p>
          <h2 className="summary-headline">{summary.headline}</h2>
          <p className="muted">
            File <strong>{summary.filename}</strong>
          </p>
        </div>
      </div>

      <dl className="metric-strip">
        <div>
          <dt>Rows</dt>
          <dd>{formatNumber(summary.rows, 0)}</dd>
        </div>
        <div>
          <dt>Columns</dt>
          <dd>{formatNumber(summary.columns, 0)}</dd>
        </div>
        <div>
          <dt>Completeness</dt>
          <dd>{formatPercent(summary.completeness)}</dd>
        </div>
        <div>
          <dt>Duplicates</dt>
          <dd>
            {formatNumber(summary.duplicate_rows, 0)}{" "}
            <span className="muted">({formatPercent(summary.duplicate_ratio)})</span>
          </dd>
        </div>
        <div>
          <dt>Memory</dt>
          <dd>{formatNumber(summary.memory_mb, 2)} MB</dd>
        </div>
      </dl>
    </section>
  );
}
