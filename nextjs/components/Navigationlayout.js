import Link from 'next/link';
import { Typography } from '@mui/material';

const NavigationLink = ({ href, label }) => {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
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

// Usage in Navigation:
<NavigationLink href="/user" label="User Profile" />
