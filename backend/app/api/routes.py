from fastapi import APIRouter, File, HTTPException, UploadFile

from app.config import Settings, get_settings
from app.models.schemas import DemoDataset, ErrorResponse, ProfileReport
from app.services.demos import list_demos, load_demo
from app.services.ingest import IngestError, read_upload_to_dataframe
from app.services.profiler import profile_dataframe

router = APIRouter()


def _http_from_ingest(exc: IngestError) -> HTTPException:
    status = 400
    if exc.code == "FILE_TOO_LARGE":
        status = 413
    elif exc.code == "DEMO_NOT_FOUND":
        status = 404
    return HTTPException(
        status_code=status,
        detail=ErrorResponse(error=exc.message, code=exc.code, detail=exc.detail).model_dump(),
    )


@router.get("/health")
def health() -> dict[str, str]:
    settings = get_settings()
    return {"status": "ok", "service": settings.app_name, "version": settings.app_version}


@router.get("/demos", response_model=list[DemoDataset])
def get_demos() -> list[DemoDataset]:
    return list_demos(get_settings())


@router.post("/profile", response_model=ProfileReport)
async def profile_upload(file: UploadFile = File(...)) -> ProfileReport:
    settings = get_settings()
    try:
        df, filename = await read_upload_to_dataframe(file, settings)
        return profile_dataframe(df, filename=filename, preview_rows=settings.preview_rows)
    except IngestError as exc:
        raise _http_from_ingest(exc) from exc
    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=ErrorResponse(error=str(exc), code="EMPTY_DATASET").model_dump(),
        ) from exc
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(
            status_code=500,
            detail=ErrorResponse(error="Unexpected profiling failure", code="INTERNAL_ERROR", detail=str(exc)).model_dump(),
        ) from exc


@router.post("/profile/demo/{demo_id}", response_model=ProfileReport)
def profile_demo(demo_id: str) -> ProfileReport:
    settings: Settings = get_settings()
    try:
        df, filename = load_demo(demo_id, settings)
        return profile_dataframe(df, filename=filename, preview_rows=settings.preview_rows)
    except IngestError as exc:
        raise _http_from_ingest(exc) from exc
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(
            status_code=500,
            detail=ErrorResponse(error="Unexpected profiling failure", code="INTERNAL_ERROR", detail=str(exc)).model_dump(),
        ) from exc
