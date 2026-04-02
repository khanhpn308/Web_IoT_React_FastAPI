"""Ensure built-in default admin exists (requested deployment default)."""

from datetime import date
from decimal import Decimal

from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models.user import User

DEFAULT_ADMIN_USERNAME = "AD00000"
# Default password for first-time setup; change after login in production.
DEFAULT_ADMIN_PASSWORD = "khanhxx007"
DEFAULT_ADMIN_CCCD = Decimal("888888888888")


def ensure_default_admin(db: Session) -> None:
    existing = (
        db.query(User).filter(User.username == DEFAULT_ADMIN_USERNAME).first()
    )
    if existing is not None:
        return

    user = User(
        username=DEFAULT_ADMIN_USERNAME,
        password=hash_password(DEFAULT_ADMIN_PASSWORD),
        fullname="System Administrator",
        cccd=DEFAULT_ADMIN_CCCD,
        email="admin@local",
        phone=None,
        creat_at=date.today(),
        status="active",
        role="admin",
    )
    db.add(user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
