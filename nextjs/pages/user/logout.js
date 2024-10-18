// pages/logout.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear user session or token here
    localStorage.removeItem('userToken'); // Adjust according to your auth setup

    // Redirect to the home page (index.js)
    router.push('/');
  }, [router]);

  return <div>Logging out...</div>;
};

export default Logout;
