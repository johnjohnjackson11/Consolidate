// File path: src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthContext } from './AuthContext';
import LoginPage from './LoginPage';
import TabbedPage from './TabbedPage';
import './FormComponent.css';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);

  return isAuthenticated ? children : <LoginPage />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute><TabbedPage /></PrivateRoute>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
