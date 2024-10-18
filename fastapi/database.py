from databases import Database

# Database connection details
POSTGRES_USER = "temp"
POSTGRES_PASSWORD = "temp"
POSTGRES_DB = "advcompro"
POSTGRES_HOST = "db"

DATABASE_URL = f'postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}/{POSTGRES_DB}'
database = Database(DATABASE_URL)

async def connect_db():
    """Connect to the database."""
    await database.connect()
    print("Database connected")

async def disconnect_db():
    """Disconnect from the database."""
    await database.disconnect()
    print("Database disconnected")

# You can keep sync_tables() function if needed for other purposes, 
# or you can remove it entirely if it's not required.
async def sync_tables():
    """Sync all necessary tables."""
    # Removed table creation logic from here.

# Function to insert a new user into the users table
async def insert_user(username: str, password_hash: str, email: str):
    query = """
    INSERT INTO users (username, password_hash, email)
    VALUES (:username, :password_hash, :email)
    RETURNING user_id, username, password_hash, email, created_at
    """
    values = {"username": username, "password_hash": password_hash, "email": email}
    return await database.fetch_one(query=query, values=values)

# Function to retrieve all users
async def get_users():
    query = "SELECT * FROM users"
    return await database.fetch_all(query=query)

# Function to insert a new product into the products table
async def insert_product(name: str, description: str, price: float, stock_quantity: int):
    query = """
    INSERT INTO products (name, description, price, stock_quantity)
    VALUES (:name, :description, :price, :stock_quantity)
    RETURNING product_id, name, description, price, stock_quantity, created_at
    """
    values = {"name": name, "description": description, "price": price, "stock_quantity": stock_quantity}
    return await database.fetch_one(query=query, values=values)

# Function to retrieve all products
async def get_products():
    query = "SELECT * FROM products"
    return await database.fetch_all(query=query)

# Function to insert a new transaction
async def insert_transaction(product_id: int, transaction_type: str, quantity: int, price: float, buyer_id: int = None, seller_id: int = None):
    query = """
    INSERT INTO transactions (product_id, transaction_type, quantity, price, buyer_id, seller_id)
    VALUES (:product_id, :transaction_type, :quantity, :price, :buyer_id, :seller_id)
    RETURNING transaction_id, product_id, transaction_type, quantity, price, total, transaction_date
    """
    values = {"product_id": product_id, "transaction_type": transaction_type, "quantity": quantity, "price": price, "buyer_id": buyer_id, "seller_id": seller_id}
    return await database.fetch_one(query=query, values=values)

# Function to retrieve all transactions
async def get_transactions():
    query = "SELECT * FROM transactions"
    return await database.fetch_all(query=query)

# Function to insert a payment
async def insert_payment(product_id: int, payment_method: str, amount: float, payment_status: str = 'pending'):
    query = """
    INSERT INTO payment (product_id, payment_method, amount, payment_status)
    VALUES (:product_id, :payment_method, :amount, :payment_status)
    RETURNING id, product_id, payment_method, amount, payment_status, created_at
    """
    values = {"product_id": product_id, "payment_method": payment_method, "amount": amount, "payment_status": payment_status}
    return await database.fetch_one(query=query, values=values)

# Function to retrieve all payments
async def get_payments():
    query = "SELECT * FROM payment"
    return await database.fetch_all(query=query)

# Function to retrieve all register entries
async def get_registers():
    query = "SELECT * FROM register"
    return await database.fetch_all(query=query)
