import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/router';

const User = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    router.push('/dashboard');
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    // Logic to log out user
  };

  return (
    <>
      <IconButton onClick={handleMenuClick} color="inherit">
        <PersonIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleProfileClick}>Dashboard</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default User;
