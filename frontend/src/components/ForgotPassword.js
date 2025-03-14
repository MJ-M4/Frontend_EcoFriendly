import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ecoFriendlyLogo from '../Photos/Ecofriendly.jpg';
import './css/Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setMessage('A password reset link has been sent to your email.');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={ecoFriendlyLogo} alt="EcoFriendly Logo" className="login-logo" />
        <h2>Forgot Password</h2>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="form-input"
            />
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <div className="forgot-password">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;