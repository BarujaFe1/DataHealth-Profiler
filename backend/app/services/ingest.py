from __future__ import annotations

import io
from pathlib import Path

import pandas as pd
from fastapi import UploadFile

from app.config import Settings


class IngestError(Exception):
    def __init__(self, code: str, message: str, detail: str | None = None):
        super().__init__(message)
        self.code = code
        self.message = message
        self.detail = detail


async def read_upload_to_dataframe(upload: UploadFile, settings: Settings) -> tuple[pd.DataFrame, str]:
    filename = upload.filename or "upload.csv"
    if not filename.lower().endswith(".csv"):
        raise IngestError(
            "INVALID_FILE",
            "Only CSV files are supported in V1.",
            "Rename or export the file as .csv and try again.",
        )

    raw = await upload.read()
    if not raw:
        raise IngestError("EMPTY_DATASET", "Uploaded file is empty.")

    if len(raw) > settings.max_upload_bytes:
        raise IngestError(
            "FILE_TOO_LARGE",
            f"File exceeds the {settings.max_upload_mb} MB limit.",
            "Try sampling the dataset or splitting it before upload.",
        )

    return _parse_csv_bytes(raw, filename, settings)


def read_path_to_dataframe(path: Path, settings: Settings) -> tuple[pd.DataFrame, str]:
    if not path.exists():
        raise IngestError("DEMO_NOT_FOUND", f"Demo dataset not found: {path.name}")
    raw = path.read_bytes()
    return _parse_csv_bytes(raw, path.name, settings)


def _parse_csv_bytes(raw: bytes, filename: str, settings: Settings) -> tuple[pd.DataFrame, str]:
    try:
        df = pd.read_csv(io.BytesIO(raw))
    except Exception as exc:  # noqa: BLE001 - surface as parse error
        raise IngestError(
            "PARSE_ERROR",
            "Could not parse CSV.",
            str(exc),
        ) from exc

    if df.empty or df.shape[1] == 0:
        raise IngestError("EMPTY_DATASET", "CSV has no usable rows or columns.")

    if len(df) > settings.max_rows:
        raise IngestError(
            "TOO_MANY_ROWS",
            f"CSV has {len(df):,} rows; V1 limit is {settings.max_rows:,}.",
            "Upload a sample for profiling, then scale later.",
        )

    return df, filename
