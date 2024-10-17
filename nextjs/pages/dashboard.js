import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PieChart from '@/components/piechart';  // Adjust the path as necessary

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [chartData, setChartData] = useState({ labels: [], values: [] });

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get('/api/users/1');  // Assuming user ID 1
      setUserData(response.data);

      // Mock data for pie chart (replace with your actual data logic)
      setChartData({
        labels: ['Red', 'Blue', 'Yellow'], // Example labels
        values: [300, 50, 100],             // Example values
      });
    };

    fetchUserData();
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Name: {userData.username}</p>
      <p>Email: {userData.email}</p>

      {/* Include the PieChart component */}
      <PieChart data={chartData} />
    </div>
  );
};

export default Dashboard;
