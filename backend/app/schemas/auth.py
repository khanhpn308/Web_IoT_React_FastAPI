from datetime import date
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, Field, field_validator


class LoginRequest(BaseModel):
    username: str = Field(..., min_length=1, max_length=45)
    password: str = Field(..., min_length=1, max_length=128)


class RegisterRequest(BaseModel):
    username: str = Field(..., min_length=1, max_length=45)
    password: str = Field(..., min_length=6, max_length=45)
    fullname: str = Field(..., min_length=1, max_length=45)
    cccd: Decimal = Field(..., description="12-digit citizen ID")
    email: str | None = Field(default=None, max_length=45)
    phone: int | None = None
    status: Literal["active", "deactive"] = "active"
    role: Literal["admin", "user"]

    @field_validator("cccd")
    @classmethod
    def cccd_digits(cls, v: Decimal) -> Decimal:
        s = str(int(v)) if v == int(v) else format(v, "f").rstrip("0").rstrip(".")
        if len(s) != 12 or not s.isdigit():
            raise ValueError("CCCD must be exactly 12 digits")
        return v


class UserPublic(BaseModel):
    user_id: int
    username: str
    fullname: str
    cccd: Decimal
    email: str | None
    phone: int | None
    creat_at: date
    status: str
    role: str

    model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserPublic


class BootstrapRequest(BaseModel):
    """Only works when the database has zero users."""

    username: str = Field(..., min_length=1, max_length=45)
    password: str = Field(..., min_length=6, max_length=45)
    fullname: str = Field(..., min_length=1, max_length=45)
    cccd: Decimal
    email: str | None = Field(default=None, max_length=45)
    phone: int | None = None

    @field_validator("cccd")
    @classmethod
    def cccd_digits(cls, v: Decimal) -> Decimal:
        s = str(int(v)) if v == int(v) else format(v, "f").rstrip("0").rstrip(".")
        if len(s) != 12 or not s.isdigit():
            raise ValueError("CCCD must be exactly 12 digits")
        return v
