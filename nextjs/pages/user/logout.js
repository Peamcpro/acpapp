// pages/logout.js
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    // Clear user session or token here
    localStorage.removeItem('userToken'); // Adjust according to your auth setup
    history.push('/'); // Redirect to index page
  }, [history]);

  return <div>Logging out...</div>;
};

export default Logout;
