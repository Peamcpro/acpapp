import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import useBearStore from "@/store/useBearStore"; // Assuming you have a store for managing state

const products = [
  {
    id: 1,
    name: "Smartphone",
    price: 699,
    imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    id: 2,
    name: "Laptop",
    price: 999,
    imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    id: 3,
    name: "Smartwatch",
    price: 199,
    imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    id: 4,
    name: "Headphones",
    price: 149,
    imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  // Add more products as needed
];

const ElectronicsShop = () => {
  const addToCart = (product) => {
    // Logic to add product to cart
    // You can update the cart in your state management store
    console.log(`Added to cart: ${product.name}`);
  };

  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={product.imageUrl}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${product.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => addToCart(product)}
                sx={{ marginTop: 1 }}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ElectronicsShop;
