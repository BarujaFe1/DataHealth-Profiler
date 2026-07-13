from __future__ import annotations

from pathlib import Path

import pandas as pd

from app.config import Settings
from app.models.schemas import DemoDataset
from app.services.ingest import IngestError, read_path_to_dataframe


DEMO_CATALOG: list[dict[str, str]] = [
    {
        "id": "titanic",
        "name": "Titanic (dirty)",
        "description": "Passenger survival data with missing ages, mixed types, and duplicate rows.",
        "filename": "titanic_dirty.csv",
    },
    {
        "id": "ecommerce",
        "name": "Ecommerce orders (dirty)",
        "description": "Orders with nulls, a constant column, high-cardinality IDs, and skewed amounts.",
        "filename": "ecommerce_dirty.csv",
    },
    {
        "id": "payroll",
        "name": "Payroll (dirty)",
        "description": "Payroll extract with empty fields, zero-heavy bonuses, and parse inconsistencies.",
        "filename": "payroll_dirty.csv",
    },
]


def resolve_data_dir(settings: Settings) -> Path:
    backend_dir = Path(__file__).resolve().parents[2]
    candidate = (backend_dir / settings.data_dir).resolve()
    if candidate.exists():
        return candidate
    # Fallback when running from repo root
    root_candidate = (backend_dir.parent / "data").resolve()
    return root_candidate


def list_demos(settings: Settings) -> list[DemoDataset]:
    data_dir = resolve_data_dir(settings)
    demos: list[DemoDataset] = []
    for item in DEMO_CATALOG:
        path = data_dir / item["filename"]
        rows = columns = None
        if path.exists():
            try:
                frame = pd.read_csv(path)
                rows, columns = int(len(frame)), int(frame.shape[1])
            except Exception:  # noqa: BLE001
                rows = columns = None
        demos.append(
            DemoDataset(
                id=item["id"],
                name=item["name"],
                description=item["description"],
                filename=item["filename"],
                rows=rows,
                columns=columns,
            )
        )
    return demos


def load_demo(demo_id: str, settings: Settings) -> tuple[pd.DataFrame, str]:
    match = next((item for item in DEMO_CATALOG if item["id"] == demo_id), None)
    if match is None:
        raise IngestError("DEMO_NOT_FOUND", f"Unknown demo id: {demo_id}")
    path = resolve_data_dir(settings) / match["filename"]
    return read_path_to_dataframe(path, settings)
