"""Regenerate frontend/public/demo-reports from the live profiler engine."""

from __future__ import annotations

import json
from pathlib import Path

from app.config import get_settings
from app.services.demos import list_demos, load_demo
from app.services.profiler import profile_dataframe


def main() -> None:
    settings = get_settings()
    out = Path(__file__).resolve().parents[1] / "frontend" / "public" / "demo-reports"
    out.mkdir(parents=True, exist_ok=True)
    catalog = []
    for item in list_demos(settings):
        df, filename = load_demo(item.id, settings)
        report = profile_dataframe(df, filename=filename, preview_rows=settings.preview_rows)
        (out / f"{item.id}.json").write_text(
            json.dumps(report.model_dump(mode="json"), ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        catalog.append(item.model_dump(mode="json"))
        print(f"{item.id}: score={report.summary.health_score} status={report.summary.health_status}")
    (out / "catalog.json").write_text(json.dumps(catalog, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote snapshots to {out}")


if __name__ == "__main__":
    main()
