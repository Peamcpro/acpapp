import React, { useState } from 'react';
import { Container, Typography, Paper, Grid, Button } from '@mui/material';

const Store = () => {
  const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 15 },
    { id: 3, name: "Product 3", price: 20 }
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Store</Typography>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Paper style={{ padding: '10px', textAlign: 'center' }}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body1">${product.price}</Typography>
              <Button 
                variant="contained" 
                color="primary" 
                style={{ marginTop: '10px' }}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Store;
