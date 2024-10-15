import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Grid, Button } from '@mui/material';
import axios from 'axios'; // Import axios for API calls

const Cart = () => {
  // Sample cart items (you might replace this with data from a global state or API)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Item 1", price: 10, quantity: 1 },
    { id: 2, name: "Item 2", price: 15, quantity: 1 },
    { id: 3, name: "Item 3", price: 20, quantity: 1 }
  ]);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate total price based on cart items
    let total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handleCheckout = async () => {
    // This function will handle the transaction
    try {
      const transactionData = {
        product_id: cartItems.map(item => item.id), // Assuming you have a way to map item IDs
        transaction_type: 'buy', // or 'sell' depending on the context
        quantity: cartItems.map(item => item.quantity), // Assuming you want to send quantities
        price: cartItems.map(item => item.price), // Prices of the items
        buyer_id: 1, // This should come from the logged-in user's info
        seller_id: 1 // Replace with the actual seller ID
      };

      // Make an API request to create a transaction
      const response = await axios.post('/api/transactions/', transactionData);
      console.log('Transaction successful:', response.data);
      // Clear cart or update state as necessary
      setCartItems([]);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      <Grid container spacing={2}>
        {cartItems.map(item => (
          <Grid item xs={12} key={item.id}>
            <Paper style={{ padding: '10px' }}>
              <Typography variant="h6">{item.name} - ${item.price} x {item.quantity}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" style={{ marginTop: '20px' }}>
        Total: ${totalPrice}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCheckout}
        style={{ marginTop: '20px' }}
      >
        Checkout
      </Button>
    </Container>
  );
};

export default Cart;
