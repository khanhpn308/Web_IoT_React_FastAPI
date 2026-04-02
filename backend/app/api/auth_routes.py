from datetime import date

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.deps import get_current_user, get_db, require_admin
from app.core.security import create_access_token, hash_password, verify_password
from app.models.user import User
from app.schemas.auth import (
    BootstrapRequest,
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UserPublic,
)

router = APIRouter(prefix="/auth", tags=["auth"])


def _user_public(u: User) -> UserPublic:
    return UserPublic.model_validate(u)


@router.post("/login", response_model=TokenResponse)
def login(body: LoginRequest, db: Session = Depends(get_db)) -> TokenResponse:
    user = db.query(User).filter(User.username == body.username).first()
    if user is None or not verify_password(body.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Tên đăng nhập hoặc mật khẩu không đúng",
        )
    if user.status != "active":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Tài khoản đã bị vô hiệu hóa",
        )
    token = create_access_token(
        subject=user.username,
        user_id=user.user_id,
        role=user.role,
    )
    return TokenResponse(
        access_token=token,
        user=_user_public(user),
    )


@router.post("/register", response_model=UserPublic)
def register(
    body: RegisterRequest,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
) -> UserPublic:
    if db.query(User).filter(User.username == body.username).first():
        raise HTTPException(status_code=400, detail="Username đã tồn tại")
    if db.query(User).filter(User.cccd == body.cccd).first():
        raise HTTPException(status_code=400, detail="CCCD đã tồn tại")

    user = User(
        username=body.username,
        password=hash_password(body.password),
        fullname=body.fullname,
        cccd=body.cccd,
        email=body.email,
        phone=body.phone,
        creat_at=date.today(),
        status=body.status,
        role=body.role,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return _user_public(user)


@router.post("/bootstrap", response_model=UserPublic)
def bootstrap_first_admin(body: BootstrapRequest, db: Session = Depends(get_db)) -> UserPublic:
    if db.query(User).count() > 0:
        raise HTTPException(status_code=403, detail="Bootstrap disabled: users already exist")

    user = User(
        username=body.username,
        password=hash_password(body.password),
        fullname=body.fullname,
        cccd=body.cccd,
        email=body.email,
        phone=body.phone,
        creat_at=date.today(),
        status="active",
        role="admin",
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return _user_public(user)


@router.get("/me", response_model=UserPublic)
def read_me(user: User = Depends(get_current_user)) -> UserPublic:
    return _user_public(user)
