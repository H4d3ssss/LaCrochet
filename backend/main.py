import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

#lalamove api
from lalamove.enums import Market
from lalamove import LalamoveSDK

#payrex api
from payrex import Client as PayrexClient

# Import routers
from routes.productRoutes import router as product_router
from routes.userRoutes import router as user_router

app = FastAPI(
    title="La Crochet API",
    description="API for La Crochet e-commerce platform",
    version="1.0.0",
)

load_dotenv()  # Load environment variables from .env file

sdk = LalamoveSDK(
    market=Market.PH,
    api_key=os.getenv("LALAMOVE_API_KEY"),
    api_secret=os.getenv("LALAMOVE_API_SECRET"),
    )

payrex = PayrexClient(os.getenv("PAYREX_API_SECRET"))

origins = [
    'http://localhost:5173', # Default Vite dev server port
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
# app.include_router(route, prefix="", tags=[])
