import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';

const Dashboard = () => {
  const dashboardData = {
    users: 120,
    sales: 750,
    products: 35
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h5">Users</Typography>
            <Typography variant="h6">{dashboardData.users}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h5">Sales</Typography>
            <Typography variant="h6">${dashboardData.sales}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h5">Products</Typography>
            <Typography variant="h6">{dashboardData.products}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
