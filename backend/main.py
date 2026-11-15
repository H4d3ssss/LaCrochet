from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from lalamove import LalamoveSDK
from lalamove.enums import Market
from dotenv import load_dotenv

app = FastAPI()

sdk = LalamoveSDK(
    market=Market.PH, 
    api_key= load_dotenv().get("LALAMOVE_API_KEY"),
    api_secret=load_dotenv().get("LALAMOVE_API_SECRET"),
    sandbox=True
    )

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

@app.get("/api/products")
def get_products():
    # Sample product data
    products = [
        {"id": 1, "name": "Product 1", "price": 10.99},
        {"id": 2, "name": "Product 2", "price": 19.99},
        {"id": 3, "name": "Product 3", "price": 5.99},
    ]
    return products