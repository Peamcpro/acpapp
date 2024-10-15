import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import FunctionsIcon from "@mui/icons-material/Functions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import useBearStore from "@/store/useBearStore"; // Custom store for app data (like cart count)

const NavigationLayout = ({ children }) => {
  const router = useRouter();
  const appName = useBearStore((state) => state.appName);  // App name from store
  const cartCount = useBearStore((state) => state.cartCount);  // Cart item count from store
  const userName = useBearStore((state) => state.userName); // User name from store
  const [anchorEl, setAnchorEl] = React.useState(null); // State for user menu

  const handleCartClick = () => {
    router.push("/cart");  // Navigate to the cart page
  };

  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor for user menu
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null); // Close user menu
  };

  const handleLogout = () => {
    // Logic for logging out the user
    console.log('User logged out');
    // Redirect to login or handle logout logic
    router.push('/login');
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#ff5e15" }}>
        <Toolbar>
          {/* App Logo and Name */}
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <FunctionsIcon sx={{ color: "#ffffff" }} fontSize="large" />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                color: "#ffffff",
                padding: "0 10px",
                fontFamily: "Prompt",
              }}
            >
              {appName}
            </Typography>
          </Link>

          {/* Navigation Links */}
          <NavigationLink href="/checkout" label="Checkout" />
          <NavigationLink href="/register" label="Register" />
          <NavigationLink href="/electronic" label="Store" />
          <NavigationLink href="/dashboard" label="Dashboard" />

          <Box sx={{ flexGrow: 1 }} /> {/* Spacer */}

          {/* Cart Button with Badge */}
          <IconButton
            color="inherit"
            aria-label="cart"
            onClick={handleCartClick}
          >
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* User Profile Menu */}
          <IconButton
            color="inherit"
            aria-label="user profile"
            onClick={handleUserMenuClick}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleUserMenuClose}
          >
            <MenuItem onClick={() => router.push("/user/profile")}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => router.push("/user/settings")}>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <main>{children}</main>
    </>
  );
};

const NavigationLink = ({ href, label }) => {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Typography
        variant="body1"
        sx={{
          fontSize: "14px",
          fontWeight: 500,
          color: "#fff",
          padding: "0 10px",
          "&:hover": {
            textDecoration: "underline",
            cursor: "pointer",
          },
        }}
      >
        {label}
      </Typography>
    </Link>
  );
};

export default NavigationLayout;
