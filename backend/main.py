import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Lalamove API
from lalamove.enums import Market
from lalamove import LalamoveSDK

# Imported so SQLAlchemy knows every table and how they link together.
from models import cartModel, categoryModel, orderModel, productModel, userModel  # noqa: F401

# Import routers
from routes.adminRoutes import router as admin_router
from routes.cartRoutes import router as cart_router
from routes.newsletterRoutes import router as newsletter_router
from routes.orderRoutes import router as order_router
from routes.paymentRoutes import router as payment_router
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
app.include_router(cart_router, prefix="/api", tags=["Cart"])
app.include_router(order_router, prefix="/api", tags=["Orders"])
app.include_router(payment_router, prefix="/api", tags=["Payments"])
app.include_router(newsletter_router, prefix="/api", tags=["Newsletter"])
app.include_router(admin_router, prefix="/api/admin", tags=["Admin"])
