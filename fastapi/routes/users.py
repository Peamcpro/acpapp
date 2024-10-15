from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from database import insert_user, get_user, update_user, delete_user, get_all_users  # Assume these are your database functions

router = APIRouter()

# Pydantic model for user creation
class UserCreate(BaseModel):
    username: str
    password_hash: str
    email: str

# Pydantic model for user update
class UserUpdate(BaseModel):
    username: Optional[str] = None
    password_hash: Optional[str] = None
    email: Optional[str] = None

# Pydantic model for user response
class User(BaseModel):
    user_id: int
    username: str
    email: str
    created_at: datetime

# Endpoint to create a new user
@router.post("/users/", response_model=User)
async def create_user(user: UserCreate):
    user_id = await insert_user(user.username, user.password_hash, user.email)
    if user_id is None:
        raise HTTPException(status_code=400, detail="Error creating user")
    return await get_user(user_id)

# Endpoint to get a user by user_id
@router.get("/users/{user_id}", response_model=User)
async def read_user(user_id: int):
    result = await get_user(user_id)
    if result is None:
        raise HTTPException(status_code=404, detail="User not found")
    return result

# Endpoint to update a user
@router.put("/users/{user_id}", response_model=User)
async def update_user_endpoint(user_id: int, user: UserUpdate):
    existing_user = await get_user(user_id)
    if existing_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    updated_user = await update_user(user_id, user.username, user.password_hash, user.email)
    return updated_user

# Endpoint to delete a user
@router.delete("/users/{user_id}")
async def delete_user_endpoint(user_id: int):
    result = await delete_user(user_id)
    if result is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"detail": "User deleted"}

# Endpoint to get all users
@router.get("/users/", response_model=List[User])
async def get_all_users_endpoint():
    users = await get_all_users()
    return users
