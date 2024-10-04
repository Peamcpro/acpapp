const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'temp',
  host: 'db', // Use 'db' because that's the service name in Docker Compose
  database: process.env.POSTGRES_DB || 'advcompro',
  password: process.env.POSTGRES_PASSWORD || 'temp',
  port: 5432
});

// Fetch all inventory items
app.get('/api/inventory', async (req, res) => {
  const result = await pool.query('SELECT * FROM inventory');
  res.json(result.rows);
});

// Add a new item to the inventory
app.post('/api/inventory', async (req, res) => {
  const { name, price, stock } = req.body;
  const result = await pool.query(
    'INSERT INTO inventory (name, price, stock) VALUES ($1, $2, $3) RETURNING *',
    [name, price, stock]
  );
  res.json(result.rows[0]);
});

// Update inventory stock
app.put('/api/inventory/:id', async (req, res) => {
  const { stock } = req.body;
  const { id } = req.params;
  const result = await pool.query(
    'UPDATE inventory SET stock = $1 WHERE id = $2 RETURNING *',
    [stock, id]
  );
  res.json(result.rows[0]);
});

// Fetch all orders
app.get('/api/orders', async (req, res) => {
  const result = await pool.query('SELECT * FROM orders');
  res.json(result.rows);
});

// Create a new order
app.post('/api/orders', async (req, res) => {
  const { items, totalPrice } = req.body;
  const result = await pool.query(
    'INSERT INTO orders (items, total_price) VALUES ($1, $2) RETURNING *',
    [JSON.stringify(items), totalPrice]
  );
  res.json(result.rows[0]);
});

// Checkout process (finalizing order and updating inventory)
app.post('/api/checkout', async (req, res) => {
  const { cart } = req.body;

  try {
    await pool.query('BEGIN');
    
    // Update inventory
    for (let item of cart) {
      await pool.query(
        'UPDATE inventory SET stock = stock - $1 WHERE id = $2',
        [item.quantity, item.id]
      );
    }

    // Add order to orders table
    const orderResult = await pool.query(
      'INSERT INTO orders (items, total_price) VALUES ($1, $2) RETURNING *',
      [JSON.stringify(cart), cart.reduce((sum, item) => sum + item.price * item.quantity, 0)]
    );
    
    await pool.query('COMMIT');
    res.json({ message: 'Checkout successful!', order: orderResult.rows[0] });
  } catch (err) {
    await pool.query('ROLLBACK');
    res.status(500).json({ error: 'Checkout failed', details: err.message });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
