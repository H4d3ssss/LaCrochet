from sqlalchemy import (
    Boolean, Column, DateTime, ForeignKey, Integer, Numeric, String, Text, func
)

from database import Base


class Product(Base):
    __tablename__ = "products"

    product_id = Column(Integer, primary_key=True)
    category_id = Column(
        Integer, ForeignKey("categories.category_id", ondelete="SET NULL"), nullable=True
    )
    name = Column(String(150), nullable=False)
    slug = Column(String(160), unique=True, nullable=False)
    description = Column(Text, nullable=False, server_default="")
    price = Column(Numeric(10, 2), nullable=False)  # exact pesos, e.g. 450.00
    image_url = Column(String(500), nullable=True)
    stock_qty = Column(Integer, nullable=False, server_default="0")
    is_active = Column(Boolean, nullable=False, server_default="true")     # false = hidden
    is_featured = Column(Boolean, nullable=False, server_default="false")  # home page "Best Selling"
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
