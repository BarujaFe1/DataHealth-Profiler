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
import {
  fetchDemos,
  getApiBase,
  probeApiHealth,
  profileDemo,
  profileUpload,
  type DemoSource,
} from "@/lib/api";
import type { DemoDataset, ProfileReport } from "@/lib/types";

export function ProfilerApp() {
  const [demos, setDemos] = useState<DemoDataset[]>([]);
  const [demosLoading, setDemosLoading] = useState(true);
  const [demoSource, setDemoSource] = useState<DemoSource>("static");
  const [apiOnline, setApiOnline] = useState(false);
  const [report, setReport] = useState<ProfileReport | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let active = true;
    setDemosLoading(true);
    Promise.all([fetchDemos(), probeApiHealth()])
      .then(([demoResult, online]) => {
        if (!active) return;
        setDemos(demoResult.demos);
        setDemoSource(demoResult.source);
        setApiOnline(online);
      })
      .catch(() => {
        if (!active) return;
        setDemos([]);
        setDemoSource("static");
        setApiOnline(false);
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
          <p className="tagline">
            Introductory lab: open a CSV and see dataset risks before analysis starts.
          </p>
        </div>
        <div className="status-chips">
          <p className={`mode-chip ${demoSource === "api" ? "is-live" : "is-static"}`}>
            {demoSource === "api" ? "Live API demos" : "Static demo pack"}
          </p>
          <p className="api-chip" title={getApiBase()}>
            API {apiOnline ? "online" : "offline"} · {getApiBase().replace(/^https?:\/\//, "")}
          </p>
        </div>
      </header>

      <section className="hero-panel">
        <div className="hero-copy">
          <h1>Where is this dataset unhealthy?</h1>
          <p>
            Upload a tabular CSV (when the API is online) or use a seeded dirty demo to get an
            explainable health score, column flags, missingness, and a first-pass profile.
          </p>
        </div>
        <UploadZone
          disabled={isPending || !apiOnline}
          onFile={(file) => runProfile(() => profileUpload(file))}
        />
      </section>

      {!apiOnline ? (
        <div className="info-banner" role="status">
          <strong>Static lab mode.</strong>
          <p>
            The profiling API is offline, so uploads are disabled. Seeded demos still work from
            precomputed reports — enough for a portfolio walkthrough without a backend process.
          </p>
        </div>
      ) : null}

      <section className="demo-section" aria-labelledby="demo-heading">
        <div className="section-heading">
          <h2 id="demo-heading">Try a dirty demo dataset</h2>
          <p>Seed files include nulls, constants, duplicates, skew, and parse noise.</p>
        </div>
        <DemoPicker
          demos={demos}
          loading={demosLoading}
          disabled={isPending}
          onSelect={(demoId) =>
            runProfile(async () => {
              const result = await profileDemo(demoId);
              setDemoSource(result.source);
              return result.report;
            })
          }
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
            Pick a demo to start. You will get a health score, attention list, and column-level
            diagnostics in one pass.
          </p>
        </section>
      ) : null}
    </div>
  );
}
