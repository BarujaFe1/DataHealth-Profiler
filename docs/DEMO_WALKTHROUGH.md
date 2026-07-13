# Guided demo (3–5 minutes)

Use this script in interviews or portfolio walkthroughs. Prefer **static demo pack** if the API is offline.

## Minute 0:00–0:40 — Problem framing

> “Before EDA, a CSV is a black box. This lab productizes the first risk read: missingness, types, constants, duplicates, and an explainable health score.”

Show README non-goals: not enterprise observability, not Great Expectations clone.

## Minute 0:40–1:30 — Demo click

1. Open the app.
2. Click **Payroll (dirty)** or **Titanic (dirty)**.
3. Point to score band + headline.
4. Scroll flags and name 2–3 codes (`constant_column`, `high_missingness`, `duplicate_rows`).

## Minute 1:30–3:00 — Column drill-down

1. Select a flagged column.
2. Show samples, numeric stats/histogram or top values.
3. Tie flag → remediation (“drop constant”, “impute age”, “dedupe before split”).

## Minute 3:00–4:00 — Architecture honesty

Open `backend/app/services/profiler.py` and walk:

- type inference heuristics
- Tukey outliers
- score penalties

Mention static snapshots under `frontend/public/demo-reports/` keep the UI demoable without a live API.

## Minute 4:00–5:00 — Trade-offs & next step

- pandas + row/size limits on purpose
- Tier C lab — introductory; deeper pipeline work lives in other projects (avoid overlapping DataFlow/auditor narratives)
- Next increment: export report or XLSX ingest — not auth/DB

## Capture checklist (screenshots)

1. Empty / hero + demos (`assets/screenshots/01-hero-demos.png`)
2. Health summary + flags (`assets/screenshots/02-health-flags.png`)
3. Column detail open (`assets/screenshots/03-column-detail.png`)
