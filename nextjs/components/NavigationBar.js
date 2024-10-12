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
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import FunctionsIcon from "@mui/icons-material/Functions";
import PersonIcon from "@mui/icons-material/Person";
import useBearStore from "@/store/useBearStore";

const NavigationLayout = ({ children }) => {
  const router = useRouter();
  const appName = useBearStore((state) => state.appName);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    router.push("/page2");
  };

  const handleLogout = () => {
    handleMenuClose();
    // Implement your logout functionality here
    console.log("Logout clicked");
    // Example: router.push("/login"); // Redirect to login page after logout
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#ff5e15" }}>
        <Toolbar>
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <FunctionsIcon sx={{ color: "#ffffff" }} fontSize="large" />
            <Typography
              variant="body1"
              sx={{
                fontSize: "22px",
                fontWeight: 500,
                color: "#ffffff",
                padding: "0 10px",
                fontFamily: "Prompt",
              }}
            >
              {appName}
            </Typography>
          </Link>
          <NavigationLink href="/checkout" label="Checkout" />
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleMenuClick} color="inherit">
            <PersonIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
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
