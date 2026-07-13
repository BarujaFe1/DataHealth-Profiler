import type { ColumnProfile } from "@/lib/types";
import { formatNumber, formatPercent } from "@/lib/format";
import { MiniHistogram } from "@/components/MiniHistogram";
import { FlagList } from "@/components/FlagList";

interface ColumnDetailProps {
  column: ColumnProfile | null;
}

export function ColumnDetail({ column }: ColumnDetailProps) {
  if (!column) {
    return (
      <div className="detail-empty">
        <p>Select a column to inspect statistics, samples, and why it was flagged.</p>
      </div>
    );
  }

  return (
    <aside className="column-detail" aria-live="polite">
      <header>
        <p className="eyebrow">Column detail</p>
        <h3>{column.name}</h3>
        <p className="muted">
          Inferred as <strong>{column.inferred_type}</strong> ·{" "}
          {formatPercent(column.null_ratio)} missing · {column.unique_count} unique
        </p>
      </header>

      <section>
        <h4>Samples</h4>
        <div className="sample-row">
          {column.sample_values.map((value, index) => (
            <code key={`${column.name}-sample-${index}`}>
              {value === null || value === undefined ? "null" : String(value)}
            </code>
          ))}
        </div>
      </section>

      {column.numeric_stats ? (
        <section>
          <h4>Numeric stats</h4>
          <dl className="stat-grid">
            <div>
              <dt>Mean</dt>
              <dd>{formatNumber(column.numeric_stats.mean)}</dd>
            </div>
            <div>
              <dt>Median</dt>
              <dd>{formatNumber(column.numeric_stats.median)}</dd>
            </div>
            <div>
              <dt>Std</dt>
              <dd>{formatNumber(column.numeric_stats.std)}</dd>
            </div>
            <div>
              <dt>Min / Max</dt>
              <dd>
                {formatNumber(column.numeric_stats.min)} /{" "}
                {formatNumber(column.numeric_stats.max)}
              </dd>
            </div>
            <div>
              <dt>Skew</dt>
              <dd>{formatNumber(column.numeric_stats.skew)}</dd>
            </div>
            <div>
              <dt>Outliers</dt>
              <dd>{formatPercent(column.numeric_stats.outlier_ratio ?? 0)}</dd>
            </div>
          </dl>
          {column.histogram ? <MiniHistogram bins={column.histogram} /> : null}
        </section>
      ) : null}

      {column.categorical_stats?.top_values?.length ? (
        <section>
          <h4>Top values</h4>
          <ul className="top-values">
            {column.categorical_stats.top_values.map((item) => (
              <li key={`${column.name}-${item.value}`}>
                <span>{item.value}</span>
                <strong>{item.count}</strong>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <h4>Flags</h4>
        <FlagList flags={column.flags} />
      </section>
    </aside>
  );
}
