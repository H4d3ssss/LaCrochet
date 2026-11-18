from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field, field_validator
from sqlalchemy import text
from sqlalchemy.orm import Session

from database import get_db
from schemas.userSchemas import EMAIL_PATTERN

router = APIRouter()


class NewsletterSignup(BaseModel):
    email: str = Field(max_length=255)

    @field_validator("email")
    @classmethod
    def check_email(cls, value: str) -> str:
        value = value.strip().lower()
        if not EMAIL_PATTERN.match(value):
            raise ValueError("Please enter a valid email address.")
        return value


@router.post("/newsletter")
def subscribe(payload: NewsletterSignup, db: Session = Depends(get_db)):
    """Footer "Join" form. Signing up twice is fine; it just re-subscribes."""
    db.execute(
        text(
            """
            insert into newsletter_subscribers (email) values (:email)
            on conflict (email) do update set unsubscribed_at = null
            """
        ),
        {"email": payload.email},
    )
    db.commit()
    return {"subscribed": True}
