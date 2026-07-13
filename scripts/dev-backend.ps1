# Backend (from repo root)
Set-Location $PSScriptRoot\..\backend
if (-not (Test-Path .venv)) {
  python -m venv .venv
}
.\.venv\Scripts\python -m pip install -r requirements.txt
Write-Host "Starting API on http://localhost:8000 ..."
.\.venv\Scripts\uvicorn app.main:app --reload --port 8000
