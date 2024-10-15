import * as React from 'react';
import { Typography, Box, TextField, Button, Divider } from '@mui/material';
import { useState } from 'react';

const Settings = () => {
  // States for managing user input
  const [email, setEmail] = useState('johndoe@example.com');
  const [name, setName] = useState('John Doe');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    // Add logic for saving the updated settings
    console.log("Settings saved:", { name, email, password });
  };

  return (
    <Box sx={{ padding: 3, maxWidth: '600px', margin: '0 auto' }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        User Settings
      </Typography>

      <Divider sx={{ marginBottom: 3 }} />

      {/* Name Field */}
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        sx={{ marginBottom: 3 }}
      />

      {/* Email Field */}
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        sx={{ marginBottom: 3 }}
      />

      {/* Password Field */}
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        sx={{ marginBottom: 3 }}
      />

      {/* Save Button */}
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Changes
      </Button>
    </Box>
  );
};

export default Settings;
