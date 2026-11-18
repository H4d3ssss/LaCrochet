from sqlalchemy import Column, DateTime, ForeignKey, Integer, func
from sqlalchemy.orm import relationship

from database import Base


class CartItem(Base):
    __tablename__ = "cart_items"

    user_id = Column(
        Integer, ForeignKey("users.user_id", ondelete="CASCADE"), primary_key=True
    )
    product_id = Column(
        Integer, ForeignKey("products.product_id", ondelete="CASCADE"), primary_key=True
    )
    quantity = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

    product = relationship("Product")
