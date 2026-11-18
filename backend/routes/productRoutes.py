from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.productModel import Product

router = APIRouter()

@router.get("/products")
def get_products(db: Session = Depends(get_db)):
    return db.query(Product).all()