from datetime import date, datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from database import get_db
from models.addressModel import Address
from models.userModel import User
from schemas.userSchemas import UserOut, UserRegister
from auth import create_access_token, get_current_user
from schemas.userSchemas import AddressOut, LoginRequest, LoginResponse, UserProfile
from security import hash_password, verify_password

router = APIRouter()

# users.terms_version is a DATE column: the day the terms last changed.
# Bump this when the Terms of Service are updated.
CURRENT_TERMS_VERSION = date(2026, 11, 18)

DUPLICATE_EMAIL = "An account with this email already exists."
WRONG_LOGIN = "Incorrect email or password."

# Checked when the email doesn't exist, so a wrong email takes as long as a
# wrong password (otherwise attackers could time it to find real emails).
_DUMMY_HASH = hash_password("not-a-real-password")


# PostgreSQL's code for "this value already exists" (unique_violation).
POSTGRES_UNIQUE_VIOLATION = "23505"


def _is_duplicate_key(exc: IntegrityError) -> bool:
    """True only when a UNIQUE rule was broken, e.g. the email is taken."""
    return getattr(exc.orig, "sqlstate", None) == POSTGRES_UNIQUE_VIOLATION


def _utcnow() -> datetime:
    """Current time in UTC (columns are timestamptz)."""
    return datetime.now(timezone.utc)


@router.post(
    "/auth/register",
    response_model=UserOut,
    status_code=status.HTTP_201_CREATED,
)
def register(payload: UserRegister, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(status.HTTP_409_CONFLICT, DUPLICATE_EMAIL)

    now = _utcnow()
    user = User(
        first_name=payload.first_name,
        last_name=payload.last_name,
        email=payload.email,
        password_hash=hash_password(payload.password),
        phone=payload.phone,
        marketing_opt_in=payload.marketing_opt_in,
        terms_accepted_at=now,
        terms_version=CURRENT_TERMS_VERSION,
        email_verified_at=None,
        created_at=now,
        updated_at=now,
    )

    # Flush first so a duplicate email that slipped past the check above
    # (two signups at once) is reported as a 409, not a 500.
    try:
        db.add(user)
        db.flush()
    except IntegrityError as exc:
        db.rollback()
        if _is_duplicate_key(exc):
            raise HTTPException(status.HTTP_409_CONFLICT, DUPLICATE_EMAIL)
        # Any other integrity error (NOT NULL, foreign key, ...) is a real bug
        # or a schema mismatch: let it surface in the server log as a 500.
        raise

    # User and address are saved together: if the address fails, neither is kept.
    try:
        address = payload.shipping_address
        if address is not None:
            db.add(
                Address(
                    user_id=user.user_id,
                    recipient_name=f"{payload.first_name} {payload.last_name}",
                    phone=payload.phone,
                    street=address.street,
                    barangay=address.barangay,
                    city=address.city,
                    province=address.province,
                    postal_code=address.postal_code,
                    country=address.country,
                    is_default=True,
                    created_at=now,
                    updated_at=now,
                )
            )
        db.commit()
    except Exception:
        db.rollback()
        raise

    db.refresh(user)
    return user


def _default_address(db: Session, user: User):
    address = (
        db.query(Address)
        .filter(Address.user_id == user.user_id)
        .order_by(Address.is_default.desc(), Address.updated_at.desc())
        .first()
    )
    return AddressOut.model_validate(address) if address else None


def _profile(db: Session, user: User) -> UserProfile:
    profile = UserProfile.model_validate(user)
    profile.default_address = _default_address(db, user)
    return profile


@router.post("/auth/login", response_model=LoginResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()

    if user is None:
        verify_password(payload.password, _DUMMY_HASH)  # same wait time either way
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, WRONG_LOGIN)

    if not verify_password(payload.password, user.password_hash):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, WRONG_LOGIN)

    token, expires_at = create_access_token(user.user_id, payload.remember_me)
    return LoginResponse(access_token=token, expires_at=expires_at, user=_profile(db, user))


@router.get("/auth/me", response_model=UserProfile)
def me(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Who is logged in? Used when the website opens, to stay logged in."""
    return _profile(db, user)
