from __future__ import annotations

import io

import pandas as pd
import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.models.schemas import ColumnType, HealthStatus
from app.services.profiler import infer_column_type, profile_dataframe


client = TestClient(app)


def test_health_endpoint() -> None:
    response = client.get("/api/health")
    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "ok"


def test_infer_identifier_and_numeric() -> None:
    ids = pd.Series([f"id-{i}" for i in range(20)])
    nums = pd.Series(["1", "2", "3", "4", "5"])
    assert infer_column_type("user_id", ids) == ColumnType.IDENTIFIER
    assert infer_column_type("amount", nums) == ColumnType.NUMERIC


def test_profile_flags_constant_and_missing() -> None:
    df = pd.DataFrame(
        {
            "user_id": [f"u{i}" for i in range(10)],
            "country": ["BR"] * 10,
            "age": [None, None, None, None, 20, 21, 22, 23, 24, 25],
            "score": [0, 0, 0, 0, 0, 0, 0, 0, 1, 2],
        }
    )
    report = profile_dataframe(df, filename="sample.csv")
    codes = {flag.code for flag in report.flags}
    assert "constant_column" in codes
    assert "high_missingness" in codes or "possible_identifier" in codes
    assert 0 <= report.summary.health_score <= 100
    assert report.summary.health_status in {
        HealthStatus.HEALTHY,
        HealthStatus.ATTENTION,
        HealthStatus.CRITICAL,
    }


def test_profile_upload_csv() -> None:
    csv_bytes = b"id,value,category\n1,10,a\n2,20,a\n3,,b\n1,10,a\n"
    response = client.post(
        "/api/profile",
        files={"file": ("demo.csv", io.BytesIO(csv_bytes), "text/csv")},
    )
    assert response.status_code == 200
    payload = response.json()
    assert payload["summary"]["rows"] == 4
    assert payload["summary"]["columns"] == 3
    assert "columns" in payload
    assert "methodology" in payload


def test_reject_non_csv() -> None:
    response = client.post(
        "/api/profile",
        files={"file": ("notes.txt", io.BytesIO(b"hello"), "text/plain")},
    )
    assert response.status_code == 400
    detail = response.json()["detail"]
    assert detail["code"] == "INVALID_FILE"


def test_demo_list_and_profile() -> None:
    listed = client.get("/api/demos")
    assert listed.status_code == 200
    demos = listed.json()
    assert len(demos) >= 1

    demo_id = demos[0]["id"]
    profiled = client.post(f"/api/profile/demo/{demo_id}")
    assert profiled.status_code == 200
    body = profiled.json()
    assert body["summary"]["rows"] > 0
    assert body["summary"]["health_score"] >= 0
