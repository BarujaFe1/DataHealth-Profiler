# Portfolio handoff — DataHealth Profiler

**Date:** 2026-07-13  
**Branch:** `chore/portfolio-quality-pass`  
**Recommendation:** **laboratório introdutório (Tier C)** — not destaque, not archive yet.

---

## Summary

DataHealth Profiler is a runnable introductory lab for first-pass CSV data-health profiling (score + explainable flags + column drill-down). This pass closed the remaining portfolio gaps: offline demo pack, real screenshots, public UI deploy, GitHub metadata, regression tests, and honest lab positioning to avoid overlap with DataFlow / public data auditor projects.

## Before → after (this pass)

| Area | Before | After |
|------|--------|-------|
| Public demo | Local only | https://datahealth-profiler.vercel.app (static demos) |
| Screenshots | SVG placeholder | 3 real PNGs in `assets/screenshots/` |
| API offline UX | Empty demos | Static catalog + precomputed reports |
| Tests | 6 | 9 (seed score + snapshot drift + duplicate penalty) |
| GitHub meta | Empty description/topics | Description + topics + homepage |
| Role | Implied product | Explicit introductory lab |

## Findings (prioritized)

### P0
- None open in code paths exercised by tests/demo.

### P1
- **Public main still behind branch** — `main` is README-era; portfolio code lives on `chore/portfolio-quality-pass` until merged.
- **No public FastAPI** — uploads disabled on Vercel (documented; static demos intentional).

### P2
- Large `icon.png` (~1.3MB).
- Screenshot 02 crops mid-report (still usable; optional full-page retake).

### P3
- Plotly / XLSX / export still roadmap.

## Bugs / gaps closed

- Demo emptiness when API offline → static demo pack fallback.
- Snapshot vs engine drift risk → regression test comparing JSON fixtures to live profiler.
- Missing visual evidence → Playwright captures.
- Missing public URL → Vercel UI deploy.
- Vague portfolio role → lab positioning + non-overlap notes.

## Commands / gates

```text
backend: pytest -q                 → 9 passed
frontend: npm run lint             → pass
frontend: npm run typecheck        → pass
frontend: npm run build            → pass
screenshots: npm run capture:screenshots → 01/02/03 PNGs
deploy: vercel --prod (frontend)   → https://datahealth-profiler.vercel.app
```

## Evidence

- Live UI: https://datahealth-profiler.vercel.app
- Screenshots: `assets/screenshots/01-hero-demos.png`, `02-health-flags.png`, `03-column-detail.png`
- Walkthrough: `docs/DEMO_WALKTHROUGH.md`
- Supermegaprompt (outside repo): `C:\dev\prompts_para_port\datahealth-profiler-supermegaprompt-portfolio.md`

## Limitations

- Heuristic DQ only; small/medium CSV scope.
- Public demo does not host the Python API.
- Not merged to `main` until PR accepted.
- Do not present as enterprise DQ, AI quality scoring, or production observability.

## Next steps

1. Open/merge PR `chore/portfolio-quality-pass` → `main`.
2. Optionally host FastAPI (Railway/Render) and point `NEXT_PUBLIC_API_URL`.
3. Keep this project as lab card; lead deeper stories with DataFlow / auditor repos.
4. Compress `icon.png`; optional full-page screenshot retake.

## Suggested commit messages

```text
feat: add static demo pack, screenshots and public UI deploy
docs: portfolio handoff and lab positioning
```
