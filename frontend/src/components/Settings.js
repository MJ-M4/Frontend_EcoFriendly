// src/components/Settings.js
import axios from 'axios';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/general.css';

const SettingsPage = ({ onLogout, userRole, userName, userId }) => {
  // Initialize state with logged-in user's name
  const [name, setName] = useState(userName || '');
  const [language, setLanguage] = useState('English');
  const [theme, setTheme] = useState('Light');
  const [notifications, setNotifications] = useState({
    alerts: true,
    reports: true,
    shifts: false,
  });
  const [message, setMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const user = { name, avatar: '/images/default-avatar.png' };

  // Name update (mocked via PUT /api/users/:userId)
  const handleNameChange = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, { name });
      setMessage('Name updated successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error: Failed to update name');
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setMessage(`Language updated to ${e.target.value}!`);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    setMessage(`Theme updated to ${e.target.value}!`);
    document.body.className = `${e.target.value.toLowerCase()}-theme`;
  };

  const handleNotificationToggle = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
    setMessage(`Notifications for ${type} ${notifications[type] ? 'disabled' : 'enabled'}!`);
  };

  // Real password update handler
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setPasswordError('');
    setLoading(true);

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError('All password fields are required.');
      setLoading(false);
      return;
    }
    if (currentPassword < 8) {
      setPasswordError('Current password must be at least 8 characters.');
      setLoading(false);
      return;
    }
    if (newPassword.trim().length < 8) {
      setPasswordError('New password must be at least 8 characters.');
      setLoading(false);
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError('New password and confirmation do not match.');
      setLoading(false);
      return;
    }
    if (newPassword === currentPassword) {
      setPasswordError('New password must be different from the current password.');
      setLoading(false);
      return;
    }

    const payload = { currentPassword, newPassword };
  console.log('Sending payload:', payload);
    try {
      await axios.put(
        `http://localhost:5000/api/users/${userId}/password`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setMessage('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      if (err.response) {
        const msg = err.response.data.message || 'Failed to update password.';
        if (msg === 'Incorrect current password') {
          setPasswordError(msg);
        } else {
          setMessage(msg);
        }
      } else if (err.request) {
        setMessage('Network error: Unable to reach the server.');
      } else {
        setMessage('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return <div className="error">Cannot update settings: No userId provided.</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar
        activePage="settings"
        onLogout={onLogout}
        userRole={userRole}
        userName={userName}
      />
      <div className="content">
        <div className="settings-container">
          <h2 className="settings-title">Settings</h2>
          <p className="settings-subtitle">Customize your experience</p>

          <div className="settings-grid">
            {/* Personal Information Card */}
            <div className="settings-card">
              <h3>Personal Information</h3>
              <form onSubmit={handleNameChange} className="settings-form">
                <div className="form-group">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    placeholder=" "
                  />
                  <label htmlFor="name" className="form-label">
                    <i className="fas fa-user"></i> Update Name
                  </label>
                </div>
                <button type="submit" className="btn primary-btn" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>

              <form onSubmit={handlePasswordUpdate} className="settings-form">
                <h3>Update Password</h3>
                <div className="form-group">
                  <input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className={`form-input ${passwordError ? 'error' : ''}`}
                    placeholder="Current Password"
                  />
                </div>
                <div className="form-group">
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`form-input ${passwordError ? 'error' : ''}`}
                    placeholder="New Password"
                  />
                </div>
                <div className="form-group">
                  <input
                    id="confirmNewPassword"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className={`form-input ${passwordError ? 'error' : ''}`}
                    placeholder="Confirm New Password"
                  />
                </div>
                {passwordError && <p className="error-message">{passwordError}</p>}
                <button type="submit" className="btn primary-btn" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>

            {/* Preferences Card */}
            <div className="settings-card">
              <h3>Preferences</h3>
              <div className="settings-form">
                <div className="form-group">
                  <select
                    id="language"
                    value={language}
                    onChange={handleLanguageChange}
                    className="form-input"
                  >
                    <option value="English">English</option>
                    <option value="Hebrew">Hebrew</option>
                    <option value="Arabic">Arabic</option>
                  </select>
                  <label htmlFor="language" className="form-label">
                    <i className="fas fa-globe"></i> Language
                  </label>
                </div>
                <div className="form-group">
                  <select
                    id="theme"
                    value={theme}
                    onChange={handleThemeChange}
                    className="form-input"
                  >
                    <option value="Light">Light</option>
                    <option value="Dark">Dark</option>
                  </select>
                  <label htmlFor="theme" className="form-label">
                    <i className="fas fa-paint-brush"></i> Theme
                  </label>
                </div>
              </div>

              <div className="settings-form">
                <h3>Notification Preferences</h3>
                <div className="notification-options">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.alerts}
                      onChange={() => handleNotificationToggle('alerts')}
                    />
                    <span className="slider"></span>
                    Receive Alerts Notifications
                  </label>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.reports}
                      onChange={() => handleNotificationToggle('reports')}
                    />
                    <span className="slider"></span>
                    Receive Reports Notifications
                  </label>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.shifts}
                      onChange={() => handleNotificationToggle('shifts')}
                    />
                    <span className="slider"></span>
                    Receive Shifts Notifications
                  </label>
                </div>
              </div>
            </div>
          </div>

          {message && (
            <div className={`settings-message ${message.includes('success') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
