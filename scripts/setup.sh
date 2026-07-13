#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "==> Backend setup"
cd "$ROOT/backend"
python -m venv .venv
# shellcheck disable=SC1091
source .venv/bin/activate
pip install -r requirements.txt
pytest -q

echo "==> Frontend setup"
cd "$ROOT/frontend"
npm install
npm run lint
npm run typecheck
npm run build

echo "Setup checks passed."
