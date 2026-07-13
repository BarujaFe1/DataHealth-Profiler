# Testing

## Backend

From `backend/`:

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
pytest -q
```

Coverage focus:

- health endpoint
- type inference (identifier / numeric)
- flag generation (constant / missingness)
- CSV upload profiling
- non-CSV rejection
- demo catalog + demo profiling

## Frontend

From `frontend/`:

```bash
npm install
npm run lint
npm run typecheck
npm run build
```

CI runs the same commands on Node 20.

## Manual demo checklist

1. Start API on `:8000` and UI on `:3000`.
2. Open home → empty state visible.
3. Click **Titanic (dirty)** → score + flags + columns render.
4. Select a flagged column → detail panel updates.
5. Upload a tiny local CSV → profile succeeds.
6. Upload `.txt` → readable error.

## Known non-goals for V1 tests

- End-to-end browser automation
- Load testing large files
- Visual regression snapshots
