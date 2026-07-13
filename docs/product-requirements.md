# Product requirements (V1)

## Problem

Analysts waste time on repetitive first-pass CSV inspection before EDA or modeling.

## Goal

Deliver a publishable web tool that turns a CSV into an explainable health report in seconds.

## In scope

- CSV upload
- Demo datasets
- Structure summary
- Type inference
- Missingness / cardinality
- Numeric stats + histogram
- Categorical top values
- Quality flags + health score
- Loading / empty / error states

## Out of scope (V1)

- Auth, teams, permissions
- Persistence / saved profiles
- Continuous monitoring
- Full Great Expectations parity
- XLSX/Parquet (planned later)

## Success criteria

- Recruiter understands value in < 30 seconds
- One-click demo works
- Backend tests pass
- Frontend builds
- Docs match the running product
