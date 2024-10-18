import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the payload
    const payload = {
      username: name,
      email: email,
      password_hash: password,  // Ensure your API expects hashed passwords
    };

    try {
      // Send POST request to the register endpoint
      const response = await axios.post('/api/register', payload);
      
      // If successful, store the response and clear form
      setResponseMessage('Registration successful!');
      setEmail('');
      setName('');
      setPassword('');
    } catch (error) {
      // Handle error and display error message
      if (error.response) {
        setErrorMessage(error.response.data.detail);
      } else {
        setErrorMessage('An error occurred during registration.');
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
