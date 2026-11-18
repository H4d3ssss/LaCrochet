from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from database import get_db
from models.addressModel import Address
from models.userModel import User
from schemas.userSchemas import UserOut, UserRegister
from security import hash_password

router = APIRouter()

# users.terms_version is a DATETIME column, so the "version" is the date the
# terms last changed. Bump this when the Terms of Service are updated.
CURRENT_TERMS_VERSION = datetime(2026, 11, 18)

DUPLICATE_EMAIL = "An account with this email already exists."


MYSQL_DUPLICATE_ENTRY = 1062


def _is_duplicate_key(exc: IntegrityError) -> bool:
    """True only for MySQL 'Duplicate entry' (error 1062)."""
    args = getattr(exc.orig, "args", ())
    return bool(args) and args[0] == MYSQL_DUPLICATE_ENTRY


def _utcnow() -> datetime:
    """Naive UTC, matching the DATETIME columns."""
    return datetime.now(timezone.utc).replace(tzinfo=None)


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
        marketing_opt_in=1 if payload.marketing_opt_in else 0,
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
