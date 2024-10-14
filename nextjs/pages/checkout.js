import React from 'react';
import { Container, Typography, Button, Paper, Grid } from '@mui/material';

const Checkout = ({ cart = [], checkout }) => {
  // Safely reduce the cart array (defaults to 0 if cart is empty or undefined)
  const totalAmount = cart?.reduce((total, item) => total + item.price, 0);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      <Grid container spacing={2}>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper style={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1">Price: ${item.price}</Typography>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" style={{ marginTop: '20px' }}>
            Your cart is empty.
          </Typography>
        )}
      </Grid>
      <Typography variant="h5" style={{ marginTop: '20px' }}>Total: ${totalAmount.toFixed(2)}</Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={checkout} 
        style={{ marginTop: '20px' }}
        disabled={cart.length === 0} // Disable button if cart is empty
      >
        Proceed to Checkout
      </Button>
    </Container>
  );
};

export default Checkout;
