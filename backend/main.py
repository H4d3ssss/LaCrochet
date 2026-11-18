import os
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP
from typing import Literal

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

# Lalamove API
from lalamove.enums import Market
from lalamove import LalamoveSDK

# PayRex API
from payrex import Client as PayrexClient

# Database and product catalog
from database import get_db
from models.productModel import Product

# Import routers
from routes.productRoutes import router as product_router
from routes.userRoutes import router as user_router

load_dotenv()  # Load environment variables from backend/.env

app = FastAPI(
    title="La Crochet API",
    description="API for La Crochet e-commerce platform",
    version="1.0.0",
)

sdk = LalamoveSDK(
    market=Market.PH,
    api_key=os.getenv("LALAMOVE_API_KEY"),
    api_secret=os.getenv("LALAMOVE_API_SECRET"),
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "La Crochet API is running!"}


app.include_router(product_router, prefix="/api", tags=["Products"])
app.include_router(user_router, prefix="/api", tags=["Auth"])


class PayrexCartItem(BaseModel):
    id: int
    quantity: int = Field(ge=1, le=99)


class PayrexCheckoutRequest(BaseModel):
    items: list[PayrexCartItem]
    shipping_method: Literal["delivery", "pickup"]


@app.post("/api/payrex/checkout-session", tags=["Payments"])
def create_payrex_checkout_session(
    payload: PayrexCheckoutRequest,
    db: Session = Depends(get_db),
):
    """Create a PayRex hosted checkout session using prices from the database."""
    secret_key = os.getenv("PAYREX_API_SECRET")
    if not secret_key:
        raise HTTPException(
            status_code=500,
            detail="PAYREX_API_SECRET is not configured on the backend.",
        )

    if not payload.items:
        raise HTTPException(status_code=400, detail="The cart is empty.")

    requested_ids = {item.id for item in payload.items}
    products = db.query(Product).filter(Product.id.in_(requested_ids)).all()
    products_by_id = {product.id: product for product in products}

    missing_ids = requested_ids - set(products_by_id)
    if missing_ids:
        raise HTTPException(
            status_code=400,
            detail=f"Products are unavailable: {', '.join(map(str, sorted(missing_ids)))}",
        )

    line_items = []
    try:
        for cart_item in payload.items:
            product = products_by_id[cart_item.id]
            price = Decimal(str(product.price))
            if not price.is_finite() or price <= 0:
                raise ValueError("Product price must be positive.")

            # PayRex expects amounts in the smallest currency unit (centavos).
            unit_amount = int(
                (price * 100).quantize(Decimal("1"), rounding=ROUND_HALF_UP)
            )
            line_items.append(
                {
                    "name": str(product.name),
                    "amount": unit_amount,
                    "quantity": cart_item.quantity,
                }
            )
    except (InvalidOperation, TypeError, ValueError, AttributeError) as exc:
        raise HTTPException(
            status_code=500,
            detail="A product in the database has invalid name or price data.",
        ) from exc

    if payload.shipping_method == "delivery":
        line_items.append(
            {
                "name": "Home delivery",
                "amount": 9000,  # ₱90.00; keep in sync with CheckoutPage.jsx
                "quantity": 1,
            }
        )

    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173").rstrip("/")

    try:
        session = PayrexClient(secret_key).checkout_sessions.create(
            {
                "currency": "PHP",
                "success_url": f"{frontend_url}/order-confirmation",
                "cancel_url": f"{frontend_url}/checkout?payment=cancelled",
                "payment_methods": ["gcash", "card", "maya", "qrph"],
                "line_items": line_items,
            }
        )
    except Exception as exc:
        raise HTTPException(
            status_code=502,
            detail="PayRex could not create a checkout session. Check the backend logs and API key mode.",
        ) from exc

    if not getattr(session, "url", None):
        raise HTTPException(
            status_code=502,
            detail="PayRex did not return a checkout URL.",
        )

    return {"checkout_url": session.url}
