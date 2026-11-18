from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from database import get_db
from models.categoryModel import Category
from models.productModel import Product

router = APIRouter()


@router.get("/products")
def get_products(db: Session = Depends(get_db)):
    # Only products switched "on" in the database are shown in the shop.
    return (
        db.query(Product)
        .filter(Product.is_active.is_(True))
        .order_by(Product.product_id)
        .all()
    )


@router.get("/products/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = (
        db.query(Product)
        .filter(Product.product_id == product_id, Product.is_active.is_(True))
        .first()
    )
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found.")
    return product


@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    """Shop sections, each with how many products are on sale in it."""
    counts = dict(
        db.query(Product.category_id, func.count(Product.product_id))
        .filter(Product.is_active.is_(True))
        .group_by(Product.category_id)
        .all()
    )
    return [
        {
            "category_id": category.category_id,
            "name": category.name,
            "slug": category.slug,
            "product_count": counts.get(category.category_id, 0),
        }
        for category in db.query(Category).order_by(Category.sort_order, Category.name)
    ]
