import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CircularProgress, Box, Typography } from '@mui/material';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      // Clear user data from local storage or session
      localStorage.removeItem('user'); // Adjust this based on your storage method

      // If you're managing sessions, you might also want to invalidate them here

      // Redirect to the login page after a short delay
      setTimeout(() => {
        router.push('/login'); // Change to your login page path
      }, 1000); // Redirect after 1 second
    };

    handleLogout();
  }, [router]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Logging out...
      </Typography>
    </Box>
  );
};

export default Logout;
