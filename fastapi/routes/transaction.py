# transactions.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from database import (
    insert_transaction,
    get_transaction,
    update_transaction,
    delete_transaction,
    get_all_transactions,
)

router = APIRouter()

# Pydantic model for transaction creation
class TransactionCreate(BaseModel):
    product_id: int
    transaction_type: str  # 'buy' or 'sell'
    quantity: int
    price: float

# Pydantic model for transaction update
class TransactionUpdate(BaseModel):
    product_id: Optional[int] = None
    transaction_type: Optional[str] = None
    quantity: Optional[int] = None
    price: Optional[float] = None

# Pydantic model for transaction response
class Transaction(BaseModel):
    transaction_id: int
    product_id: int
    transaction_type: str
    quantity: int
    price: float
    total: float
    transaction_date: datetime

# Endpoint to create a new transaction
@router.post("/transactions/", response_model=Transaction)
async def create_transaction(transaction: TransactionCreate):
    transaction_id = await insert_transaction(
        transaction.product_id,
        transaction.transaction_type,
        transaction.quantity,
        transaction.price
    )
    return await get_transaction(transaction_id)

# Endpoint to get a transaction by transaction_id
@router.get("/transactions/{transaction_id}", response_model=Transaction)
async def read_transaction(transaction_id: int):
    result = await get_transaction(transaction_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return result

# Endpoint to update a transaction
@router.put("/transactions/{transaction_id}", response_model=Transaction)
async def update_transaction_endpoint(transaction_id: int, transaction: TransactionUpdate):
    existing_transaction = await get_transaction(transaction_id)
    if existing_transaction is None:
        raise HTTPException(status_code=404, detail="Transaction not found")
    
    updated_transaction = await update_transaction(transaction_id, transaction)
    return updated_transaction

# Endpoint to delete a transaction
@router.delete("/transactions/{transaction_id}")
async def delete_transaction_endpoint(transaction_id: int):
    result = await delete_transaction(transaction_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return {"detail": "Transaction deleted"}

# Endpoint to get all transactions
@router.get("/transactions/", response_model=List[Transaction])
async def get_all_transactions_endpoint():
    transactions = await get_all_transactions()
    return transactions
