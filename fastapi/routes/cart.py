from fastapi import APIRouter, HTTPException
from typing import List
from database import get_cart_items  # Assume this is your function to fetch cart items
from pydantic import BaseModel

router = APIRouter()

class CartItem(BaseModel):
    product_id: int
    product_name: str
    quantity: int

@router.get("/cart/{user_id}", response_model=List[CartItem])
async def get_cart(user_id: int):
    cart_items = await get_cart_items(user_id)
    if cart_items is None:
        raise HTTPException(status_code=404, detail="Cart not found")
    return cart_items
