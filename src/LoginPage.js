// File path: src/LoginPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const { login } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace with your own password validation logic
    if (password === 'yourpassword') {
      login('test-token');
      navigate('/');
    } else {
      alert('Invalid password');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
