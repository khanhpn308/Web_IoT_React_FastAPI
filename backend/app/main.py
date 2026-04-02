from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings
from app.core.db import SessionLocal, engine
from app.core.db_migrate import ensure_user_expired_at_column
from app.core.db_wait import wait_for_db
from app.core.seed import ensure_default_admin
from app.core.user_expiry import deactivate_expired_users
from app.models import user  # noqa: F401
from app.models.base import Base


@asynccontextmanager
async def lifespan(app: FastAPI):
    await wait_for_db()
    Base.metadata.create_all(bind=engine)
    ensure_user_expired_at_column(engine)
    with SessionLocal() as db:
        ensure_default_admin(db)
        deactivate_expired_users(db)
    yield


def create_app() -> FastAPI:
    app = FastAPI(title=settings.app_name, lifespan=lifespan)

    origins = [o.strip() for o in settings.cors_origins.split(",") if o.strip()]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins or ["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api_router, prefix="/api")
    return app


app = create_app()

