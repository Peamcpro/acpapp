import { useState, useEffect } from "react";
import axios from "axios";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await axios.get('/api/cart/1');  // Fetch cart items for user ID 1
      setCartItems(response.data);

      // Calculate total price
      const total = response.data.reduce((sum, item) => sum + item.quantity * 1000, 0);  // Assuming product price is 1000
      setTotalPrice(total);
    };

    fetchCart();
  }, []);

  const handleCheckout = async () => {
    await axios.post('/api/checkout', { userId: 1, cartItems });
    alert("Checkout successful!");
  };

  return (
    <div>
      <h1>Checkout</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item.product_id}>Product ID: {item.product_id} | Quantity: {item.quantity}</li>
        ))}
      </ul>
      <p>Total Price: ${totalPrice}</p>
      <button onClick={handleCheckout}>Complete Purchase</button>
    </div>
  );
};

export default Checkout;
