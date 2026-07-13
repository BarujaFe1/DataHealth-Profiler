from __future__ import annotations

from pathlib import Path

import pandas as pd

from app.config import get_settings
from app.services.demos import load_demo
from app.services.profiler import profile_dataframe


ROOT = Path(__file__).resolve().parents[2]
FIXTURES = ROOT / "frontend" / "public" / "demo-reports"


def test_seed_scores_are_stable() -> None:
    """Regression: seed profiles should stay in expected score bands."""
    settings = get_settings()
    expectations = {
        "titanic": ("critical", 30, 60),
        "ecommerce": ("critical", 0, 40),
        "payroll": ("attention", 45, 75),
    }

    for demo_id, (status, lo, hi) in expectations.items():
        df, filename = load_demo(demo_id, settings)
        report = profile_dataframe(df, filename=filename, preview_rows=settings.preview_rows)
        assert report.summary.health_status.value == status
        assert lo <= report.summary.health_score <= hi
        assert report.flags, f"{demo_id} should emit flags"


def test_static_demo_snapshots_match_engine() -> None:
    """Static portfolio demos must not drift from the live profiler engine."""
    settings = get_settings()
    for demo_id in ("titanic", "ecommerce", "payroll"):
        snapshot_path = FIXTURES / f"{demo_id}.json"
        assert snapshot_path.exists(), f"Missing snapshot {snapshot_path}"
        df, filename = load_demo(demo_id, settings)
        live = profile_dataframe(df, filename=filename, preview_rows=settings.preview_rows)
        import json

        static = json.loads(snapshot_path.read_text(encoding="utf-8"))
        assert static["summary"]["health_score"] == live.summary.health_score
        assert static["summary"]["health_status"] == live.summary.health_status.value
        assert len(static["flags"]) == len(live.flags)


def test_duplicate_penalty_changes_score() -> None:
    clean = pd.DataFrame({"a": [1, 2, 3], "b": ["x", "y", "z"]})
    dirty = pd.DataFrame({"a": [1, 1, 1], "b": ["x", "x", "x"]})
    clean_score = profile_dataframe(clean, "clean.csv").summary.health_score
    dirty_score = profile_dataframe(dirty, "dirty.csv").summary.health_score
    assert dirty_score < clean_score
