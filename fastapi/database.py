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

async def sync_tables():
    """Sync all necessary tables."""
    
    # SQL for creating Users table
    create_users_table = """
    CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        email VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """
    
    # SQL for creating Register table
    create_register_table = """
    CREATE TABLE IF NOT EXISTS register (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        phone_number VARCHAR(15)
    );
    """
    
    # SQL for creating Products table
    create_products_table = """
    CREATE TABLE IF NOT EXISTS products (
        product_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        stock_quantity INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """
    
    # SQL for creating Transactions table
    create_transactions_table = """
    CREATE TABLE IF NOT EXISTS transactions (
        transaction_id SERIAL PRIMARY KEY,
        product_id INT REFERENCES products(product_id),
        transaction_type VARCHAR(10) CHECK (transaction_type IN ('buy', 'sell')),
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        total DECIMAL(10, 2) GENERATED ALWAYS AS (quantity * price) STORED,
        buyer_id INT,
        seller_id INT,
        transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """
    
    # SQL for creating Payment table
    create_payment_table = """
    CREATE TABLE IF NOT EXISTS payment (
        id SERIAL PRIMARY KEY,
        product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
        payment_method VARCHAR(50) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        payment_status VARCHAR(50) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """
    
    # Execute the SQL to sync all tables
    await database.execute(create_users_table)
    print("Users table created/synced.")
    
    await database.execute(create_register_table)
    print("Register table created/synced.")
    
    await database.execute(create_products_table)
    print("Products table created/synced.")
    
    await database.execute(create_transactions_table)
    print("Transactions table created/synced.")
    
    await database.execute(create_payment_table)
    print("Payment table created/synced.")

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
