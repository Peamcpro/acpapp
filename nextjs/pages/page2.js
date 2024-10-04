import { Box, Typography, Grid, Card, CardContent, Button, Avatar, Container } from "@mui/material";

export default function User() {
  // Sample user data
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    avatarUrl: "https://via.placeholder.com/150",
    orders: [
      { id: 1, date: "2024-09-23", status: "Shipped", total: "$200.00" },
      { id: 2, date: "2024-09-15", status: "Delivered", total: "$150.00" },
    ],
  };

  return (
    <Container>
      <Box sx={{ py: 5 }}>
        <Grid container spacing={4} justifyContent="center">
          {/* User Profile */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                  <Avatar alt={user.name} src={user.avatarUrl} sx={{ width: 100, height: 100 }} />
                </Box>
                <Typography variant="h5" align="center" gutterBottom>
                  {user.name}
                </Typography>
                <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
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

          {/* Order History */}
          <Grid item xs={12} sm={6} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order History
                </Typography>
                {user.orders.length > 0 ? (
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
    </Container>
  );
}
