"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { DemoPicker } from "@/components/DemoPicker";
import { UploadZone } from "@/components/UploadZone";
import { HealthSummary } from "@/components/HealthSummary";
import { FlagList } from "@/components/FlagList";
import { ColumnTable } from "@/components/ColumnTable";
import { ColumnDetail } from "@/components/ColumnDetail";
import { PreviewTable } from "@/components/PreviewTable";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { fetchDemos, getApiBase, profileDemo, profileUpload } from "@/lib/api";
import type { DemoDataset, ProfileReport } from "@/lib/types";

export function ProfilerApp() {
  const [demos, setDemos] = useState<DemoDataset[]>([]);
  const [demosLoading, setDemosLoading] = useState(true);
  const [report, setReport] = useState<ProfileReport | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let active = true;
    setDemosLoading(true);
    fetchDemos()
      .then((items) => {
        if (active) setDemos(items);
      })
      .catch(() => {
        if (active) setDemos([]);
      })
      .finally(() => {
        if (active) setDemosLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const selected = useMemo(
    () => report?.columns.find((column) => column.name === selectedColumn) ?? null,
    [report, selectedColumn],
  );

  function runProfile(task: () => Promise<ProfileReport>) {
    setError(null);
    startTransition(async () => {
      try {
        const next = await task();
        setReport(next);
        setSelectedColumn(next.columns[0]?.name ?? null);
      } catch (err) {
        setReport(null);
        setSelectedColumn(null);
        setError(err instanceof Error ? err.message : "Unexpected error");
      }
    });
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="brand">DataHealth Profiler</p>
          <p className="tagline">Open a CSV. See the risks before the analysis starts.</p>
        </div>
        <p className="api-chip" title={getApiBase()}>
          API {getApiBase().replace(/^https?:\/\//, "")}
        </p>
      </header>

      <section className="hero-panel">
        <div className="hero-copy">
          <h1>Where is this dataset unhealthy?</h1>
          <p>
            Upload a tabular CSV and get an explainable health score, column flags,
            missingness, cardinality, and a first-pass profile — without opening a notebook.
          </p>
        </div>
        <UploadZone disabled={isPending} onFile={(file) => runProfile(() => profileUpload(file))} />
      </section>

      <section className="demo-section" aria-labelledby="demo-heading">
        <div className="section-heading">
          <h2 id="demo-heading">Or try a dirty demo dataset</h2>
          <p>Seed files include nulls, constants, duplicates, skew, and parse noise.</p>
        </div>
        <DemoPicker
          demos={demos}
          loading={demosLoading}
          disabled={isPending}
          onSelect={(demoId) => runProfile(() => profileDemo(demoId))}
        />
      </section>

      {error ? (
        <div className="error-banner" role="alert">
          <strong>Could not profile this file.</strong>
          <p>{error}</p>
        </div>
      ) : null}

      {isPending ? <LoadingSkeleton /> : null}

      {!isPending && report ? (
        <div className="report-stack">
          <HealthSummary summary={report.summary} />

          <div className="two-col">
            <section>
              <div className="section-heading">
                <h2>Quality flags</h2>
                <p>Small, explainable rules — not a black-box risk model.</p>
              </div>
              <FlagList flags={report.flags} />
            </section>
            <section>
              <div className="section-heading">
                <h2>Methodology</h2>
                <p>How the score and flags are produced.</p>
              </div>
              <ul className="methodology-list">
                {report.methodology.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="columns-layout">
            <section>
              <div className="section-heading">
                <h2>Columns</h2>
                <p>Click a row to open details, samples, and distributions.</p>
              </div>
              <ColumnTable
                columns={report.columns}
                selected={selectedColumn}
                onSelect={setSelectedColumn}
              />
            </section>
            <ColumnDetail column={selected} />
          </div>

          <section>
            <div className="section-heading">
              <h2>Preview</h2>
              <p>First rows after parsing — useful for sanity checks.</p>
            </div>
            <PreviewTable rows={report.preview} />
          </section>
        </div>
      ) : null}

      {!isPending && !report && !error ? (
        <section className="empty-state">
          <h2>No profile yet</h2>
          <p>
            Drop a CSV or pick a demo. You will get a health score, attention list, and
            column-level diagnostics in one pass.
          </p>
        </section>
      ) : null}
    </div>
  );
}
