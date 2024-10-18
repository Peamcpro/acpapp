import asyncpg
from typing import Optional

# Database connection details
POSTGRES_USER = "temp"
POSTGRES_PASSWORD = "temp"
POSTGRES_DB = "advcompro"
POSTGRES_HOST = "db"

DATABASE_URL = f'postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}/{POSTGRES_DB}'

class Database:
    def __init__(self, db_url: str):
        self.db_url = db_url
        self.pool = None

    async def connect(self):
        """Connect to the database."""
        self.pool = await asyncpg.create_pool(self.db_url)
        print("Database connected")

    async def disconnect(self):
        """Disconnect from the database."""
        await self.pool.close()
        print("Database disconnected")

    async def execute(self, query: str, *args):
        async with self.pool.acquire() as connection:
            return await connection.execute(query, *args)

    async def fetch(self, query: str, *args):
        async with self.pool.acquire() as connection:
            return await connection.fetch(query, *args)

    async def fetch_one(self, query: str, *args):
        async with self.pool.acquire() as connection:
            return await connection.fetchrow(query, *args)

    async def fetch_all(self, query: str, *args):
        async with self.pool.acquire() as connection:
            return await connection.fetch(query, *args)

# Create an instance of the Database class
database = Database(DATABASE_URL)

# Function to insert a new user into the users table
async def insert_user(username: str, password_hash: str, email: str):
    query = """
    INSERT INTO users (username, password_hash, email)
    VALUES ($1, $2, $3)
    RETURNING user_id, username, email, created_at
    """
    return await database.fetch_one(query, username, password_hash, email)

# Function to retrieve a user by user_id or username
async def get_user(identifier: str):
    query = "SELECT * FROM users WHERE username = $1 OR user_id = $1"
    return await database.fetch_one(query, identifier)

# Function to update a user
async def update_user(user_id: int, username: Optional[str], password_hash: Optional[str], email: Optional[str]):
    query = """
    UPDATE users
    SET username = COALESCE($1, username),
        password_hash = COALESCE($2, password_hash),
        email = COALESCE($3, email)
    WHERE user_id = $4
    RETURNING user_id, username, email, created_at
    """
    return await database.fetch_one(query, username, password_hash, email, user_id)

# Function to delete a user
async def delete_user(user_id: int):
    query = "DELETE FROM users WHERE user_id = $1 RETURNING user_id"
    return await database.fetch_one(query, user_id)

# Function to retrieve a user by email
async def get_user_by_email(email: str):
    query = "SELECT * FROM users WHERE email = $1"
    return await database.fetch_one(query, email)

# Example function to verify the password (you should implement this based on your password hashing logic)
async def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Implement your password verification logic here
    return plain_password == hashed_password  # Placeholder comparison

# Function to insert a new product
async def insert_product(name: str, description: str, price: float, stock_quantity: int):
    query = """
    INSERT INTO products (name, description, price, stock_quantity)
    VALUES ($1, $2, $3, $4)
    RETURNING product_id, name, description, price, stock_quantity
    """
    return await database.fetch_one(query, name, description, price, stock_quantity)

# Function to retrieve all products
async def get_products():
    query = "SELECT * FROM products"
    return await database.fetch_all(query)

# Function to insert a new transaction
async def insert_transaction(product_id: int, transaction_type: str, quantity: int, price: float, buyer_id: Optional[int] = None, seller_id: Optional[int] = None):
    query = """
    INSERT INTO transactions (product_id, transaction_type, quantity, price, buyer_id, seller_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING transaction_id, product_id, transaction_type, quantity, price
    """
    return await database.fetch_one(query, product_id, transaction_type, quantity, price, buyer_id, seller_id)

# Function to retrieve all transactions
async def get_transactions():
    query = "SELECT * FROM transactions"
    return await database.fetch_all(query)

# Function to insert a payment
async def insert_payment(product_id: int, payment_method: str, amount: float, payment_status: str = 'pending'):
    query = """
    INSERT INTO payment (product_id, payment_method, amount, payment_status)
    VALUES ($1, $2, $3, $4)
    RETURNING id, product_id, payment_method, amount, payment_status
    """
    return await database.fetch_one(query, product_id, payment_method, amount, payment_status)

# Function to retrieve all payments
async def get_payments():
    query = "SELECT * FROM payment"
    return await database.fetch_all(query)
