import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';

const User = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Logic for logging out the user
    console.log('User logged out');
    router.push('/login');
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5">User Profile</Typography>
      <Typography variant="body1">Name: John Doe</Typography>
      <Typography variant="body1">Email: johndoe@example.com</Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={() => router.push('/user/settings')}
      >
        Edit Profile
      </Button>

      <Button
        variant="contained"
        color="secondary"
        sx={{ marginTop: 2, marginLeft: 2 }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default User;
