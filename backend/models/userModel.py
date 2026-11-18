from sqlalchemy import Boolean, Column, DateTime, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
  __tablename__ = "users"

  user_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
  first_name = Column(String(100), nullable=False)
  last_name = Column(String(100), nullable=False)
  password_hash = Column(
      String(255), nullable=False
  ) 
  phone = Column(String(20), nullable=True)  
  marketing_opt_in = Column(
      Integer, nullable=False, default=0
  )  
  terms_accepted_at = Column(
      DateTime, nullable=True
  )  
  terms_version = Column(
      DateTime, nullable=False
  )  
  email_verified_at = Column(String(50), nullable=False)
  created_at = Column(DateTime, nullable=False)
  updated_at = Column(DateTime, nullable=False)
  email = Column(String(255), unique=True, index=True, nullable=False)