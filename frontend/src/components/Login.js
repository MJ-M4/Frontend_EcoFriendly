<<<<<<< HEAD
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ecoFriendlyLogo from '../Photos/Ecofriendly.jpg';
import './css/Login.css';

const Login = ({ onLogin, isAuthenticated }) => {
  const [identity, setIdentity] = useState('');
=======
// src/components/Login.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../components/api';
import ecoFriendlyLogo from '../Photos/Ecofriendly.jpg';
import './css/Login.css';
const Login = ({ onLogin, isAuthenticated }) => {
  const [id, setId] = useState('');
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5005/local/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity, password }),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (response.ok && data.status === 'success') {
        onLogin(data);
        navigate('/general');
      } else {
        setError(data.message || 'Login failed');
      }
=======
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
      const response = await axios.post(loginAPI, {
        user_id: id,
        password: password,
      });

      const { role, user_id, name } = response.data;
      onLogin(role, user_id, name);
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
    } catch (err) {
      console.error('Fetch Error:', err);
      setError('Failed to connect to the server. Please check if the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/EcofriendlyBackground.jpg)` }}>
      <div className="login-box">
        <img src={ecoFriendlyLogo} alt="EcoFriendly System Logo" className="login-logo" />
        <h2>Login to EcoFriendly System</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="identity">Identity</label>
            <input
              type="text"
<<<<<<< HEAD
              id="identity"
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
=======
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
              required
              placeholder="Enter your identity"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
<<<<<<< HEAD
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="form-input"
              aria-describedby="password-error"
            />
            <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >{showPassword ? 'Hide' : 'Show'}
=======
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
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
              </button>
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
<<<<<<< HEAD
          <div className="forgot-password">
=======
        <div className="forgot-password">
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;