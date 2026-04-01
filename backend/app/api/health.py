from fastapi import APIRouter
from fastapi import HTTPException

from app.core.db import db_ping

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "ok"}


@router.get("/health/db")
def health_db():
    try:
        db_ping()
        return {"status": "ok", "db": "ok"}
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=503, detail=f"db unavailable: {exc}") from exc

