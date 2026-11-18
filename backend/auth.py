"""Login tokens: who is making this request?

After logging in, the website gets a signed "token" (like a stamped wristband).
It sends the token with each request, and the server checks the stamp instead
of asking for the password every time.
"""

import os
from datetime import datetime, timedelta, timezone
from typing import Optional

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from database import get_db
from models.userModel import User

ALGORITHM = "HS256"
SHORT_SESSION = timedelta(days=1)    # "Remember me" not ticked
LONG_SESSION = timedelta(days=30)    # "Remember me" ticked

_bearer = HTTPBearer(auto_error=False)
NOT_LOGGED_IN = "Please log in again."


def _secret() -> str:
    secret = os.getenv("JWT_SECRET")
    if not secret or len(secret) < 32:
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR,
            "Login isn't set up yet: add a JWT_SECRET (at least 32 characters) to backend/.env.",
        )
    return secret


def create_access_token(user_id: int, remember_me: bool) -> tuple[str, datetime]:
    expires_at = datetime.now(timezone.utc) + (LONG_SESSION if remember_me else SHORT_SESSION)
    token = jwt.encode(
        {"sub": str(user_id), "exp": expires_at, "iat": datetime.now(timezone.utc)},
        _secret(),
        algorithm=ALGORITHM,
    )
    return token, expires_at


def _user_from_token(token: str, db: Session) -> Optional[User]:
    try:
        payload = jwt.decode(token, _secret(), algorithms=[ALGORITHM])
        user_id = int(payload["sub"])
    except (jwt.PyJWTError, KeyError, ValueError):
        return None  # expired, tampered with, or not a token at all
    return db.get(User, user_id)


def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(_bearer),
    db: Session = Depends(get_db),
) -> User:
    """For pages that need someone logged in."""
    user = _user_from_token(credentials.credentials, db) if credentials else None
    if user is None:
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED, NOT_LOGGED_IN,
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


def get_optional_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(_bearer),
    db: Session = Depends(get_db),
) -> Optional[User]:
    """For pages that work for guests too (like checkout)."""
    if credentials is None:
        return None
    return _user_from_token(credentials.credentials, db)


def get_admin_user(user: User = Depends(get_current_user)) -> User:
    """For the shop owner's pages: logged in AND role = admin."""
    if user.role != "admin":
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Only the shop owner can do this.")
    return user
