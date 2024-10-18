# registration.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from database import (
    insert_register,
    get_register,
    update_register,
    delete_register,
    get_all_registers,
)

router = APIRouter()

class RegisterCreate(BaseModel):
    username: str
    email: str
    password_hash: str
    first_name: str
    last_name: str

class RegisterUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    password_hash: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None

class Register(BaseModel):
    id: int
    username: str
    email: str
    first_name: str
    last_name: str
    created_at: datetime
    updated_at: datetime

@router.post("/registers/", response_model=Register)
async def create_register(register: RegisterCreate):
    register_id = await insert_register(
        register.username,
        register.email,
        register.password_hash,
        register.first_name,
        register.last_name
    )
    return await get_register(register_id)

@router.get("/registers/{register_id}", response_model=Register)
async def read_register(register_id: int):
    result = await get_register(register_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Register not found")
    return result

@router.put("/registers/{register_id}", response_model=Register)
async def update_register_endpoint(register_id: int, register: RegisterUpdate):
    existing_register = await get_register(register_id)
    if existing_register is None:
        raise HTTPException(status_code=404, detail="Register not found")
    
    updated_register = await update_register(register_id, register)
    return updated_register

@router.delete("/registers/{register_id}")
async def delete_register_endpoint(register_id: int):
    result = await delete_register(register_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Register not found")
    return {"detail": "Register deleted"}

@router.get("/registers/", response_model=List[Register])
async def get_all_registers_endpoint():
    registers = await get_all_registers()
    return registers
