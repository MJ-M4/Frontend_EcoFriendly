// src/components/Login.js
<<<<<<< HEAD
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ecoFriendlyLogo from '../Photos/Ecofriendly.jpg';
import './css/Login.css';

const Login = ({ onLogin, isAuthenticated }) => {
  // We'll store numeric ID in 'identity'
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
=======
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ecoFriendlyLogo from "../Photos/Ecofriendly.jpg"; // Ensure this path is correct

import "./css/Login.css";

const Login = ({ onLogin, isAuthenticated }) => {
  // State for form inputs and UI
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "worker",
  });
>>>>>>> 290a976d397015edc2ebd3551cd7461758cf136f
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // If already logged in, redirect to General Page
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/general");
    }
  }, [isAuthenticated, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { username, password, role } = formData;

<<<<<<< HEAD
    // Basic validation
    if (!identity || !password) {
      setError('Please enter both your numeric ID and password.');
=======
    if (!username || !password) {
      setError("Please enter both username and password");
>>>>>>> 290a976d397015edc2ebd3551cd7461758cf136f
      return;
    }

    setIsLoading(true);
<<<<<<< HEAD

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

=======

    // Simulate API call delay
    setTimeout(() => {
      console.log("Username:", username);
      console.log("Password:", password);
      console.log("Role:", role);

      // Mock login validation
      onLogin(
        role,
        role === "worker"
          ? username.toLowerCase().includes("worker3")
            ? "Maintenance Worker"
            : "Other"
          : null
      );
>>>>>>> 290a976d397015edc2ebd3551cd7461758cf136f
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
          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="identity">Numeric ID</label>
            <input
<<<<<<< HEAD
              type="number"
              id="identity"
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
=======
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
>>>>>>> 290a976d397015edc2ebd3551cd7461758cf136f
              required
              placeholder="Enter your numeric ID"
              className="form-input"
            />
          </div>

<<<<<<< HEAD
=======
          {/* Password Field */}
>>>>>>> 290a976d397015edc2ebd3551cd7461758cf136f
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="form-input"
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

<<<<<<< HEAD
          {/* Removed the 'role' dropdown since login is now ID + password only */}

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

=======
          {/* Role Selection */}
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input"
            >
              <option value="worker">Worker</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Forgot Password Link */}
>>>>>>> 290a976d397015edc2ebd3551cd7461758cf136f
        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
