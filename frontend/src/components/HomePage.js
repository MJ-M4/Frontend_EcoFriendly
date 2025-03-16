import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ecoFriendlyLogo from '../Photos/Ecofriendly.jpg';
import './css/Login.css';

const Login = ({ onLogin, isAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('worker');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/general');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    // Simulate an API call
    setTimeout(() => {
      // Mock login success
      onLogin(role);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Ecofriendly</h1>
          <p className="tagline">Monitor garbage containers in real-time and optimize waste collection processes.</p>
          <div className="hero-buttons">
            <button className="cta-button primary" onClick={() => navigate('/login')}>
              Get Started
            </button>
            <button
              className="cta-button secondary"
              onClick={() =>
                window.scrollTo({
                  top: document.querySelector('.features-section').offsetTop,
                  behavior: 'smooth',
                })
              }
            >
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h3>Real-Time Monitoring</h3>
            <p>Track container fullness levels using IoT sensors.</p>
            <a href="#monitoring" className="feature-link">Learn More</a>
          </div>
          <div className="feature-card">
            <FaCalendarAlt className="feature-icon" />
            <h3>Automated Scheduling</h3>
            <p>Schedule waste collection based on container data.</p>
            <a href="#scheduling" className="feature-link">Learn More</a>
          </div>
          <div className="feature-card">
            <FaDatabase className="feature-icon" />
            <h3>Data Analytics</h3>
            <p>Analyze waste trends and optimize operations.</p>
            <a href="#analytics" className="feature-link">Learn More</a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <FaUser className="testimonial-icon" />
              <p className="quote">"{testimonial.quote}"</p>
              <p className="author">
                {testimonial.name}, {testimonial.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <form className="contact-form" onSubmit={handleContactSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
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
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-input"
            >
              <option value="worker">Worker</option>
              <option value="manager">Manager</option>
            </select>
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