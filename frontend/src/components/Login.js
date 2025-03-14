// src/components/Login.js
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

  // Redirect to General Page if already authenticated
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
    // Simulate API call delay
    setTimeout(() => {
      console.log('Username:', username);
      console.log('Password:', password);
      console.log('Role:', role);

      // Mock login validation
      onLogin(role, role === 'worker' ? (username.toLowerCase().includes('worker3') ? 'Maintenance Worker' : 'Other') : null);
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
