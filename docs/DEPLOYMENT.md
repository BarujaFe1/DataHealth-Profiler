# Deployment

## Public demo (current)

- **UI:** https://datahealth-profiler.vercel.app
- **Mode:** static demo pack (uploads need a running FastAPI backend)
- Seeded demos (Titanic / Ecommerce / Payroll) work without the API

## Local

Terminal A — backend:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Terminal B — frontend:

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000

Windows helpers: `scripts/dev-backend.ps1`, `scripts/dev-frontend.ps1`.

## Frontend (Vercel)

1. Import the GitHub repo in Vercel.
2. Set **Root Directory** to `frontend`.
3. Framework preset: Next.js.
4. Env:
   - `NEXT_PUBLIC_API_URL` = public backend URL (e.g. `https://datahealth-api.example.com`)
5. Deploy.

`next build` must pass before promoting to production.

## Backend (Railway / Render)

1. New web service from this repo.
2. Root / workdir: `backend`.
3. Build: `pip install -r requirements.txt`
4. Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Env:
   - `CORS_ORIGINS` = your Vercel origin(s), comma-separated
   - `DATA_DIR=../data` (or absolute path that includes seed CSVs)
   - optional: `MAX_UPLOAD_MB`, `MAX_ROWS`, `PREVIEW_ROWS`

Ensure the `data/` folder is available to the service (deploy from monorepo root or copy seeds into the image).

## Demo mode

No auth and no DB. Public demos are served from `data/*_dirty.csv` via:

`POST /api/profile/demo/{titanic|ecommerce|payroll}`

## Security notes for public demos

- Do not upload sensitive production data to a public instance.
- Keep upload size/row limits enabled.
- Rotate / restrict CORS to known frontend origins in production.
