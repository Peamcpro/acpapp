import { useState, useEffect } from "react";
import axios from "axios";

const User = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get('/api/users/1');  // Fetching user with ID 1
      setUser(response.data);
    };

    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default User;
