import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Badge,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import FunctionsIcon from "@mui/icons-material/Functions";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useBearStore from "@/store/useBearStore"; // Custom store for app data (like cart count)

const NavigationLayout = ({ children }) => {
  const router = useRouter();
  const appName = useBearStore((state) => state.appName);  // App name from store
  const cartCount = useBearStore((state) => state.cartCount);  // Cart item count from store
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    router.push("/dashboard");
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    // Logic to log out user (e.g., clear user data, redirect to login)
  };

  const handleCartClick = () => {
    router.push("/cart");  // Navigate to the cart page
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
          <NavigationLink href="/categories" label="Categories" />
          <NavigationLink href="/dashboard" label="Dashboard" />

          <div style={{ flexGrow: 1 }} />

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

          {/* User Icon with Menu */}
          <IconButton onClick={handleMenuClick} color="inherit">
            <PersonIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleProfileClick}>Dashboard</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
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
d