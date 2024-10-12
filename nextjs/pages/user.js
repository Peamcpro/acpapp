import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";

export default function UserPage() {
  const [user, setUser] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/users/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include authentication token if necessary
          // 'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Container>
      <Box sx={{ py: 5 }}>
        <Grid container spacing={4} justifyContent="center">
          {/* User Profile */}
          {user ? (
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                    <Avatar
                      alt={user.name}
                      src={user.avatarUrl}
                      sx={{ width: 100, height: 100 }}
                    />
                  </Box>
                  <Typography variant="h5" align="center" gutterBottom>
                    {user.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    color="textSecondary"
                    gutterBottom
                  >
                    {user.email}
                  </Typography>
                  <Box sx={{ textAlign: "center" }}>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                      Edit Profile
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                Loading user information...
              </Typography>
            </Grid>
          )}

          {/* Order History */}
          <Grid item xs={12} sm={6} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order History
                </Typography>
                {user && user.orders.length > 0 ? (
                  <Box>
                    {user.orders.map((order) => (
                      <Box key={order.id} sx={{ mb: 2 }}>
                        <Typography variant="body1">
                          Order #{order.id} - {order.date}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Status: {order.status}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Total: {order.total}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    You have no orders yet.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
