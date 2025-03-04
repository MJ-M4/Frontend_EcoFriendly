// src/App.js
import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import GeneralPage from './components/General';
import HomePage from './components/HomePage';
import Login from './components/Login';
<<<<<<< HEAD
=======
import BinLocations from './components/BinLocations';
import './App.css';
>>>>>>> 8492e3056eb0100072704294092c769b1d036392

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
<<<<<<< HEAD
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
=======
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bins" element={<BinLocations />} />
>>>>>>> 8492e3056eb0100072704294092c769b1d036392
      </Routes>
    </Router>
  );
}

export default App;