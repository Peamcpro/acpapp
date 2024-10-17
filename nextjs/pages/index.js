import Head from "next/head";
import { Box, Typography, Button, Container } from "@mui/material";

export default function Home() {
  return (
    <>
      <Head>
        <title>Makondrew Shop - Home</title>
        <meta name="description" content="Welcome to Makondrew Shop" />
      </Head>
      <main>
        <Container>
          <Box sx={{ textAlign: "center", py: 5 }}>
            <Typography variant="h3" gutterBottom>
              Welcome to Makondrew Shop
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Explore the best products across different categories!
            </Typography>
            </Box>
          {/* Optional Hero Image */}
          <Box sx={{ mb: 5 }}>
            <img 
              src="/path/to/your/hero-image.jpg" 
              alt="Hero" 
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }} 
            />
          </Box>
        </Container>
      </main>
      <footer>
        <Container>
          <Box sx={{ textAlign: "center", py: 3, bgcolor: "#f5f5f5" }}>
            <Typography variant="body2" color="textSecondary">
              &copy; {new Date().getFullYear()} Makondrew Shop. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </footer>
    </>
  );
}
