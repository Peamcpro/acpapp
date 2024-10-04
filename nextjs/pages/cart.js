import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Item 1", price: 10 },
    { id: 2, name: "Item 2", price: 15 },
    { id: 3, name: "Item 3", price: 20 }
  ]);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = cartItems.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  }, [cartItems]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      <Grid container spacing={2}>
        {cartItems.map(item => (
          <Grid item xs={12} key={item.id}>
            <Paper style={{ padding: '10px' }}>
              <Typography variant="h6">{item.name} - ${item.price}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" style={{ marginTop: '20px' }}>
        Total: ${totalPrice}
      </Typography>
    </Container>
  );
};

export default Cart;
