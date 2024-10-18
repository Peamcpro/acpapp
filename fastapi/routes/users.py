from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from database import *  # Ensure your database functions are imported

router = APIRouter()

# Pydantic model for user creation
class UserCreate(BaseModel):
    username: str
    password_hash: str  # Consider using a hashed password here
    email: str

# Pydantic model for user update
class UserUpdate(BaseModel):  # Renamed for consistency
    username: Optional[str] = None
    password_hash: Optional[str] = None
    email: Optional[str] = None

# Pydantic model for user response
class User(BaseModel):
    user_id: int
    username: str
    email: str  # Omit password_hash from response for security
    created_at: datetime

# Pydantic model for login
class UserLogin(BaseModel):
    email: str
    password_hash: str

# Endpoint to create a new user
@router.post("/users/create", response_model=User)
async def create_user(user: UserCreate):
    # Check if the username already exists
    existing_user = await get_user(user.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    result = await insert_user(user.username, user.password_hash, user.email)
    if result is None:
        raise HTTPException(status_code=400, detail="Error creating user")
    return result

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
    result = await update_user(user_id, user.username, user.password_hash, user.email)
    if result is None:
        raise HTTPException(status_code=404, detail="User not found")
    return result

# Endpoint to delete a user
@router.delete("/users/{user_id}")
async def delete_user_endpoint(user_id: int):
    result = await delete_user(user_id)
    if result is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"detail": "User deleted"}

# Endpoint for user login
@router.post("/users/login", response_model=User)
async def login_user(user: UserLogin):
    # Fetch user from the database
    db_user = await get_user_by_email(user.email)

    if db_user is None or not await verify_password(user.password_hash, db_user.password_hash):
        raise HTTPException(status_code=404, detail="Invalid email or password")

    # If login is successful, return user info (omit password hash)
    return {
        "user_id": db_user.user_id,
        "username": db_user.username,
        "email": db_user.email,
        "created_at": db_user.created_at
    }
