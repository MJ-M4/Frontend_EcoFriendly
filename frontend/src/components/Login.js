// src/components/Login.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ecoFriendlyLogo from '../Photos/Ecofriendly.jpg';
import './css/Login.css';

const Login = ({ onLogin, isAuthenticated }) => {
  // We'll store numeric ID in 'identity'
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // If already logged in, redirect to General Page
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/general');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!identity || !password) {
      setError('Please enter both your numeric ID and password.');
      return;
    }

    setIsLoading(true);

    // Make a real request to your Flask backend
    axios.post('http://localhost:5000/login', {
      identity: Number(identity), // Convert input to a number
      password: password
    })
    .then((response) => {
      // Example response data from Flask:
      // { message: "Login successful!", id: 207705096, role: "worker", worker_type: "Cleaner" }
      const { role, id, worker_type } = response.data;

      // Call onLogin to set global/auth state in your parent (App.js)
      // Pass the role and other info as needed
      onLogin(role, worker_type, id);

      setIsLoading(false);
      // Navigate to your default page (if not handled in onLogin)
      // navigate('/general');
    })
    .catch((err) => {
      setError(err.response?.data?.error || 'Invalid ID or password.');
      setIsLoading(false);
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src={ecoFriendlyLogo}
          alt="EcoFriendly System Logo"
          className="login-logo"
        />
        <h2>Login to EcoFriendly System</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="identity">Numeric ID</label>
            <input
              type="number"
              id="identity"
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
              required
              placeholder="Enter your numeric ID"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="form-input"
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Removed the 'role' dropdown since login is now ID + password only */}

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
