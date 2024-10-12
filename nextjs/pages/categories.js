import { Box, Typography, Grid, Card, CardActionArea, CardContent } from "@mui/material";
import Link from "next/link";

const categories = [
  { id: 1, name: "Electronics", slug: "electronics", imageUrl: "/images/electronics.jpg" },
  { id: 2, name: "Fashion", slug: "fashion", imageUrl: "/images/fashion.jpg" },
  { id: 3, name: "Home & Garden", slug: "home-garden", imageUrl: "/images/home-garden.jpg" },
  { id: 4, name: "Sports", slug: "sports", imageUrl: "/images/sports.jpg" },
];

export default function Categories() {
  return (
    <Box sx={{ py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Product Categories
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {categories.map((category) => (
          <Grid item key={category.id} xs={12} sm={6} md={3}>
            <Link href={`/categories/${category.slug}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardActionArea>
                  <img src={category.imageUrl} alt={category.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                  <CardContent>
                    <Typography variant="h6" component="div" align="center">
                      {category.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
