from sqlalchemy import Boolean, Column, Date, DateTime, Integer, String, func

from database import Base


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False)  # always lowercase
    password_hash = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=True)
    role = Column(String(20), nullable=False, server_default="customer")  # customer | admin
    marketing_opt_in = Column(Boolean, nullable=False, server_default="false")
    terms_accepted_at = Column(DateTime(timezone=True), nullable=True)
    terms_version = Column(Date, nullable=False)  # the date the terms last changed
    email_verified_at = Column(DateTime(timezone=True), nullable=True)  # NULL until verified
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
