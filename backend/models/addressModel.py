from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Address(Base):
  __tablename__ = "addresses"  # Adjust table name if it differs slightly in your DB

  id = Column(Integer, primary_key=True, index=True, autoincrement=True)
  user_id = Column(
      Integer, ForeignKey("users.user_id"), nullable=False, index=True
  )
  recipient_name = Column(String(200), nullable=False)
  phone = Column(String(20), nullable=False)
  street = Column(String(255), nullable=False)
  barangay = Column(String(100), nullable=False)
  city = Column(String(100), nullable=False)
  province = Column(String(100), nullable=False)
  postal_code = Column(String(10), nullable=False)
  country = Column(String(100), nullable=False)
  is_default = Column(Boolean, nullable=True, default=False)
  created_at = Column(DateTime, nullable=False)
  updated_at = Column(DateTime, nullable=False)