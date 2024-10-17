import { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

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

  // Example data for the pie chart (you can customize this based on the API data)
  const pieData = {
    labels: ['Completed Tasks', 'Pending Tasks'], // Example labels
    datasets: [
      {
        label: 'Tasks Distribution',
        data: [70, 30], // Example data (customize this based on actual user data)
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Name: {userData.username}</p>
      <p>Email: {userData.email}</p>

      {/* Pie Chart */}
      <div style={{ width: '400px', height: '400px' }}>
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default Dashboard;
