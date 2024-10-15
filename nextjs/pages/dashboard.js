import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get('/api/users/1');  // Assuming user ID 1
      setUserData(response.data);
    };

    fetchUserData();
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Name: {userData.username}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
};

export default Dashboard;
