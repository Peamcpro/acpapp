// pages/transactions.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [productId, setProductId] = useState('');
  const [transactionType, setTransactionType] = useState('buy');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  // Fetch existing transactions on page load
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/transactions'); // Adjust the API endpoint accordingly
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/transactions', {
        product_id: productId,
        transaction_type: transactionType,
        quantity,
        price,
      });

      setSnackbarMessage('Transaction created successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      
      // Reset form fields
      setProductId('');
      setTransactionType('buy');
      setQuantity('');
      setPrice('');

      // Refresh the transactions list
      setTransactions((prev) => [...prev, response.data]);
    } catch (error) {
      setSnackbarMessage('Failed to create transaction.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <Grid container spacing={2} style={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Transactions
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Create Transaction
          </Typography>
          <form onSubmit={handleTransactionSubmit}>
            <TextField
              fullWidth
              label="Product ID"
              variant="outlined"
              margin="normal"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
            <TextField
              fullWidth
              label="Transaction Type"
              variant="outlined"
              margin="normal"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <TextField
              fullWidth
              label="Quantity"
              variant="outlined"
              margin="normal"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              margin="normal"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth type="submit" style={{ marginTop: '16px' }}>
              Create Transaction
            </Button>
          </form>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Existing Transactions
        </Typography>
        {transactions.map((transaction) => (
          <Paper key={transaction.transaction_id} style={{ padding: '10px', marginBottom: '10px' }}>
            <Typography>
              ID: {transaction.transaction_id} - Product ID: {transaction.product_id} - Type: {transaction.transaction_type} - Quantity: {transaction.quantity} - Price: {transaction.price} - Total: {transaction.total}
            </Typography>
          </Paper>
        ))}
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default TransactionsPage;
