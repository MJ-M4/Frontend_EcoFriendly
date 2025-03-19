import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ecoFriendlyLogo from '../Photos/Ecofriendly.jpg';
import './css/Login.css';

// Define API endpoints as constants
const LOGIN_API = 'http://localhost:5000/api/auth/login';

const Login = ({ onLogin, isAuthenticated }) => {
  const [id, setId] = useState(''); // Changed from username to id
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/general');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!id || !password) {
      setError('Please enter both ID and password');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(LOGIN_API, {
        user_id: id, // Changed to user_id to match backend
        password: password,
      });

      // On successful login, call onLogin with the role from the response
      const { role } = response.data;
      onLogin(role);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/EcofriendlyBackground.jpg)`, backgroundSize: 'cover' }}>
      <div className="login-box">
        <img src={ecoFriendlyLogo} alt="EcoFriendly System Logo" className="login-logo" />
        <h2>Login to EcoFriendly System</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">ID</label> {/* Changed label to ID */}
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              placeholder="Enter your ID (e.g., 207705096)"
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
          <button type="submit" className="login-button" disabled={isLoading}>
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