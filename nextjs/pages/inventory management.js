import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';

const Inventory = ({ products, updateInventory }) => {
  const addStock = (id) => {
    updateInventory(id, 'add');
  };

  const removeStock = (id) => {
    updateInventory(id, 'remove');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Inventory Management</Typography>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body1">Price: ${product.price}</Typography>
              <Typography variant="body1">Stock: {product.stock}</Typography>
              <Button onClick={() => addStock(product.id)} variant="contained" color="primary" style={{ margin: '5px' }}>
                Add Stock
              </Button>
              <Button onClick={() => removeStock(product.id)} variant="contained" color="secondary" style={{ margin: '5px' }}>
                Remove Stock
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Inventory;
