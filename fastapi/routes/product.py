# products.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from database import (
    insert_product,
    get_product,
    update_product,
    delete_product,
    get_all_products,
)

router = APIRouter()

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    stock_quantity: int

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    stock_quantity: Optional[int] = None

class Product(BaseModel):
    product_id: int
    name: str
    description: str
    price: float
    stock_quantity: int
    created_at: datetime

@router.post("/products/", response_model=Product)
async def create_product(product: ProductCreate):
    product_id = await insert_product(
        product.name,
        product.description,
        product.price,
        product.stock_quantity
    )
    return await get_product(product_id)

@router.get("/products/{product_id}", response_model=Product)
async def read_product(product_id: int):
    result = await get_product(product_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return result

@router.put("/products/{product_id}", response_model=Product)
async def update_product_endpoint(product_id: int, product: ProductUpdate):
    existing_product = await get_product(product_id)
    if existing_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    updated_product = await update_product(product_id, product)
    return updated_product

@router.delete("/products/{product_id}")
async def delete_product_endpoint(product_id: int):
    result = await delete_product(product_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"detail": "Product deleted"}

@router.get("/products/", response_model=List[Product])
async def get_all_products_endpoint():
    products = await get_all_products()
    return products
