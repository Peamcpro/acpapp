# payments.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from database import (
    insert_payment,
    get_payment,
    update_payment,
    delete_payment,
    get_all_payments,
)

router = APIRouter()

class PaymentCreate(BaseModel):
    product_id: int
    payment_method: str
    amount: float
    payment_status: Optional[str] = 'pending'

class PaymentUpdate(BaseModel):
    product_id: Optional[int] = None
    payment_method: Optional[str] = None
    amount: Optional[float] = None
    payment_status: Optional[str] = None

class Payment(BaseModel):
    id: int
    product_id: int
    payment_method: str
    amount: float
    payment_status: str
    created_at: datetime

@router.post("/payments/", response_model=Payment)
async def create_payment(payment: PaymentCreate):
    payment_id = await insert_payment(
        payment.product_id,
        payment.payment_method,
        payment.amount,
        payment.payment_status
    )
    return await get_payment(payment_id)

@router.get("/payments/{payment_id}", response_model=Payment)
async def read_payment(payment_id: int):
    result = await get_payment(payment_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Payment not found")
    return result

@router.put("/payments/{payment_id}", response_model=Payment)
async def update_payment_endpoint(payment_id: int, payment: PaymentUpdate):
    existing_payment = await get_payment(payment_id)
    if existing_payment is None:
        raise HTTPException(status_code=404, detail="Payment not found")
    
    updated_payment = await update_payment(payment_id, payment)
    return updated_payment

@router.delete("/payments/{payment_id}")
async def delete_payment_endpoint(payment_id: int):
    result = await delete_payment(payment_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Payment not found")
    return {"detail": "Payment deleted"}

@router.get("/payments/", response_model=List[Payment])
async def get_all_payments_endpoint():
    payments = await get_all_payments()
    return payments
