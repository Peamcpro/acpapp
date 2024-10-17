import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/1');  // Fetching user data with ID 1
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
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
