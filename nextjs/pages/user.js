import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';

const UserPage = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Logic to handle logout, e.g., clearing user session and redirecting
    console.log('User logged out');
    router.push('/login');
  };

  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>

      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6">Name: John Doe</Typography>
        <Typography variant="body1">Email: johndoe@example.com</Typography>
        <Typography variant="body1">Member since: January 2022</Typography>
      </Box>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => router.push('/user/settings')} 
        sx={{ marginRight: 2 }}
      >
        Edit Profile
      </Button>

      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Container>
  );
};

export default UserPage;
