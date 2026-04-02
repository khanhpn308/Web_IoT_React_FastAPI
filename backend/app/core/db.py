from sqlalchemy import create_engine, text
from sqlalchemy.engine import Engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings


def get_engine() -> Engine:
    return create_engine(settings.database_url, pool_pre_ping=True)


engine = get_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def db_ping() -> bool:
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    return True

