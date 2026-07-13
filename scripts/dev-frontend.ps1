# Frontend (from repo root)
Set-Location $PSScriptRoot\..\frontend
if (-not (Test-Path node_modules)) {
  npm install
}
if (-not (Test-Path .env.local)) {
  Copy-Item .env.example .env.local
}
Write-Host "Starting Next.js on http://localhost:3000 ..."
npm run dev
