# Technical decisions

## pandas for V1 profiling

**Decision:** use pandas in-process for CSV profiling.  
**Why:** fastest path to a trustworthy demo for small/medium files; rich enough for missingness, cardinality, histograms, and type heuristics.  
**Trade-off:** not for multi-GB lakehouse workloads. Documented limits protect the process.

## Separate FastAPI backend

**Decision:** Next.js frontend talks to a Python API.  
**Why:** data work stays in Python; UI stays in TypeScript; each side can deploy independently (Vercel + Railway/Render).  
**Trade-off:** local DX needs two processes; CORS/env wiring required.

## Stateless flow (no DB)

**Decision:** upload in → JSON out.  
**Why:** matches V1 scope, reduces security/ops surface, keeps demos instant.  
**Trade-off:** no saved profiles or history until V2.

## Explainable flags + score

**Decision:** small rule set with human-readable messages, consolidated into a 0–100 score.  
**Why:** portfolio clarity and interview storytelling beat opaque “AI quality” claims.  
**Trade-off:** rules are heuristics, not domain-perfect governance.

## Lightweight UI charts

**Decision:** CSS/SVG mini-histograms instead of bundling Plotly in V1.  
**Why:** faster installs, simpler SSR/client boundary, enough for first-pass distributions.  
**Trade-off:** fewer interactive chart features; Plotly remains a roadmap option.

## Seed dirty datasets

**Decision:** ship three intentionally messy CSVs.  
**Why:** recruiters can click once and see flags fire; reproducibility without personal data.

## Testing focus

**Decision:** backend unit/API tests first; frontend lint + typecheck + build in CI.  
**Why:** scoring/flag logic is where correctness matters most for this product.
