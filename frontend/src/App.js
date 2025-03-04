// src/App.js
import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import GeneralPage from './components/General';
import HomePage from './components/HomePage';
import Login from './components/Login';

function App() {
  // State to track if the user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle login (will be passed to Login component)
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        {/* Root path redirects to HomePage */}
        <Route path="/" element={<Navigate to="/HomePage" replace />} />
        
        {/* Home Page route */}
        <Route path="/HomePage" element={<HomePage />} />
        
        {/* Login Page route */}
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} isAuthenticated={isAuthenticated} />}
        />
        
        {/* General Page route - protected */}
        <Route
          path="/general"
          element={
            isAuthenticated ? (
              <GeneralPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;