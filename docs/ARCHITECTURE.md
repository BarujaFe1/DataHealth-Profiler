# Architecture — DataHealth Profiler

## Overview

DataHealth Profiler is a **stateless** CSV profiling tool:

1. Frontend uploads a CSV (or requests a seed demo).
2. Backend parses with pandas, profiles columns, applies quality flags, and computes a health score.
3. Frontend renders summary, flags, column table, detail panel, and preview.

No database, auth, or persistence in V1.

```txt
Browser (Next.js)
   │  multipart CSV / demo id
   ▼
FastAPI (/api/profile, /api/profile/demo/{id}, /api/demos)
   │
   ├─ ingest  → validate + parse
   ├─ profiler → types, metrics, histograms
   ├─ flags   → explainable rules
   └─ score   → 0–100 + status band
   │
   ▼
ProfileReport JSON
```

## Packages

### `backend/app`

| Module | Responsibility |
|--------|----------------|
| `api/routes.py` | HTTP surface |
| `services/ingest.py` | Upload/path validation and CSV parsing |
| `services/profiler.py` | Column profiling, flags, score |
| `services/demos.py` | Seed catalog and loaders |
| `models/schemas.py` | Pydantic contract |
| `config.py` | Env-backed settings |

### `frontend/src`

| Area | Responsibility |
|------|----------------|
| `components/ProfilerApp.tsx` | App orchestration, loading/error states |
| `components/*` | Upload, demos, summary, table, detail, charts |
| `lib/api.ts` | API client |
| `lib/types.ts` | Shared TS types mirroring backend contract |

### `data/`

Controlled dirty CSVs for public demos (`titanic`, `ecommerce`, `payroll`).

## API contract (V1)

- `GET /api/health`
- `GET /api/demos`
- `POST /api/profile` — `multipart/form-data` field `file`
- `POST /api/profile/demo/{demo_id}`

Response: `ProfileReport` (`summary`, `columns`, `flags`, `preview`, `methodology`).

## Limits

- CSV only
- Default max upload: 10 MB
- Default max rows: 50,000
- Preview: first 20 rows

## Why this shape

- Separates analytical engine from UI (recruiter-readable backend).
- Keeps demos reproducible without infra.
- Pydantic models double as documentation and validation.
