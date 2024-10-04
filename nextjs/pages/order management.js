import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';

const Order = ({ products, addToCart }) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Order Management</Typography>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body1">Price: ${product.price}</Typography>
              <Typography variant="body1">Stock: {product.stock}</Typography>
              <Button onClick={() => addToCart(product)} variant="contained" color="primary">
                Add to Cart
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Order;
