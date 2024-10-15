import { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await axios.get('/api/cart/1');  // Assuming user ID 1
      setCartItems(response.data);
    };

    fetchCart();
  }, []);

  if (cartItems.length === 0) return <div>Cart is empty</div>;

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item.product_id}>Product ID: {item.product_id} | Quantity: {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
