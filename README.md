<div align="center">
  <img src="./icon.png" alt="DataHealth Profiler Logo" width="120" height="120" />

  <h1>DataHealth Profiler</h1>
  <p><strong>Open a CSV and understand, in seconds, where the dataset risks are.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/status-V1%20runnable-0f766e.svg" alt="Status V1 runnable" />
    <img src="https://img.shields.io/badge/frontend-Next.js-111827.svg?logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/backend-FastAPI-0ea5e9.svg?logo=fastapi&logoColor=white" alt="FastAPI" />
    <img src="https://img.shields.io/badge/data-pandas-150458.svg?logo=pandas&logoColor=white" alt="pandas" />
    <img src="https://img.shields.io/badge/tests-pytest-0A9EDC.svg" alt="pytest" />
    <img src="https://img.shields.io/badge/license-MIT-16a34a.svg" alt="MIT License" />
  </p>
</div>

![DataHealth Profiler screenshot placeholder](./assets/screenshot-placeholder.svg)

---

## The problem

A CSV lands on your desk and analysis pressure starts immediately — but the file is still a black box.

Before any insight, you burn time on the same checklist: nulls, types, cardinality, constants, duplicates, weird parses, identifier-looking columns. Those early mistakes quietly poison dashboards and models.

## The solution

**DataHealth Profiler** turns that first inspection into a clear, repeatable product flow:

1. Upload a CSV (or click a dirty demo dataset).
2. The FastAPI backend profiles structure and quality with pandas.
3. You get a **health score**, **explainable flags**, column diagnostics, and a preview — in one pass.

It is intentionally **not** an enterprise observability platform. V1 does one job well: *is this dataset healthy enough to start, and what needs attention first?*

---

## Main features (V1)

- CSV upload with size/row guards
- One-click demos: Titanic, Ecommerce, Payroll (intentionally dirty)
- Dataset summary: rows, columns, completeness, duplicates, memory
- Column type inference (numeric, categorical, datetime, boolean, identifier, text)
- Missingness, cardinality, samples
- Numeric stats + mini histogram
- Categorical top values
- Quality flags (empty, high nulls, constant, identifier, high cardinality, skew, outliers, zeros, duplicates, parse noise)
- Health score with healthy / attention / critical bands
- Methodology callouts in the UI
- Loading, empty, and error states

---

## Architecture

```txt
Next.js UI  --multipart/demo-->  FastAPI + pandas + Pydantic  -->  ProfileReport JSON
```

Details: [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)

---

## Stack

| Layer | Choices |
|-------|---------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS 4 |
| Backend | FastAPI, pandas, Pydantic Settings |
| Quality | pytest, ESLint, `tsc`, GitHub Actions |
| Deploy targets | Vercel (UI) + Railway/Render (API) |

---

## Demo locally

### Requirements

- Node.js 20+
- Python 3.11+ (3.12 tested)
- npm + pip

### Backend

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Windows helpers: `scripts/dev-backend.ps1`, `scripts/dev-frontend.ps1`.

---

## Environment variables

See [`.env.example`](./.env.example).

| Variable | Where | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_API_URL` | frontend | Backend base URL |
| `CORS_ORIGINS` | backend | Allowed browser origins |
| `MAX_UPLOAD_MB` | backend | Upload size guard |
| `MAX_ROWS` | backend | Row guard |
| `DATA_DIR` | backend | Path to seed CSVs |

Never commit real `.env` files or sensitive datasets.

---

## Tests

```bash
# backend
cd backend && pytest -q

# frontend
cd frontend
npm run lint
npm run typecheck
npm run build
```

More: [`docs/TESTING.md`](./docs/TESTING.md)

---

## Technical decisions & trade-offs

- **pandas in V1** — fast, honest tooling for small/medium CSVs; not a lakehouse engine.
- **Separate Python API** — keeps analytics idiomatic and UI focused.
- **Stateless** — zero DB complexity for a sharper portfolio demo.
- **Explainable flags** — interview-friendly over “magic AI score”.
- **Mini histograms over Plotly (for now)** — lighter bundle; Plotly remains optional later.

Full write-up: [`docs/TECHNICAL_DECISIONS.md`](./docs/TECHNICAL_DECISIONS.md)

---

## Roadmap

### Done in this pass
- Runnable backend + frontend
- Seed datasets + demos
- Tests + CI
- Portfolio docs

### Next
- Report export (JSON/Markdown)
- TSV / XLSX ingest
- Richer charts (Plotly)
- Before/after cleaning comparison
- Optional saved profiles (V2)

---

## Current status

**V1 is runnable locally.** Upload or demo → profile report works end-to-end. Public cloud deploy is documented but not required to evaluate the project.

---

## What this project demonstrates

- Product sense: sharp problem framing and deliberate non-goals
- Full-stack delivery: Next.js UI + FastAPI analytical backend
- Data craft: profiling metrics, flags, and scoring methodology
- Engineering hygiene: typed contracts, tests, CI, env examples
- Communication: docs a recruiter and an engineer can both trust

---

## How I would present this in an interview

1. **Hook (20s):** “Before EDA, every CSV is a black box — this tool makes the first risk read productized.”
2. **Scope judgment:** show what V1 is *not* (no fake enterprise platform).
3. **Live demo:** click Payroll or Titanic dirty → walk flags and score bands.
4. **Deep dive:** open `profiler.py` and explain one rule + how it affects the score.
5. **Trade-offs:** pandas limits, stateless choice, why flags beat opaque ML quality scores.
6. **Next increment:** export + multi-format ingest without bloating architecture.

---

## Documentation map

- [`docs/AUDIT_REPORT.md`](./docs/AUDIT_REPORT.md)
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- [`docs/TECHNICAL_DECISIONS.md`](./docs/TECHNICAL_DECISIONS.md)
- [`docs/TESTING.md`](./docs/TESTING.md)
- [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md)
- [`docs/HANDOFF.md`](./docs/HANDOFF.md)
- [`docs/api-contract.md`](./docs/api-contract.md)
- [`docs/product-requirements.md`](./docs/product-requirements.md)

---

## Author

**Felipe Alirio Baruja** ([BarujaFe1](https://github.com/BarujaFe1/))

- Portfolio: [https://barujafe.vercel.app/](https://barujafe.vercel.app/)
- LinkedIn: [linkedin.com/in/barujafe](https://www.linkedin.com/in/barujafe/)

## License

MIT — see [LICENSE](./LICENSE).
