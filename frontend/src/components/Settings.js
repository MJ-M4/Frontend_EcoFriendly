// src/components/Settings.js
import axios from 'axios';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/general.css';

const SettingsPage = ({ onLogout, userRole, userIdentity }) => {
  const [name, setName] = useState('Mohamed Mhagne');
  const [language, setLanguage] = useState('English');
  const [theme, setTheme] = useState('Light');
  const [notifications, setNotifications] = useState({
    alerts: true,
    reports: true,
    shifts: false,
  });
  const [message, setMessage] = useState('');

  // For password update
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Suppose we pass the user object down (including identity)
  const user = { name, avatar: '/images/sami.png' };

  const handleNameChange = (e) => {
    e.preventDefault();
    // Optional: update name in backend if you have a route
    setMessage('Name updated successfully (local mock)!');
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setMessage(`Language updated to ${e.target.value}! (mock)`);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    setMessage(`Theme updated to ${e.target.value}! (mock)`);
    document.body.className = e.target.value.toLowerCase() + '-theme';
  };

  const handleNotificationToggle = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
    setMessage(`Notifications for ${type} updated! (mock)`);
  };

  // Real password update
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setMessage('');

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setMessage('Error: All password fields are required.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setMessage('Error: New password and confirmation do not match.');
      return;
    }
    if (newPassword === currentPassword) {
      setMessage('Error: New password must be different from current password.');
      return;
    }

    // Real request to Flask
    axios
      .put('http://localhost:5000/update-password', {
        identity: parseInt(userIdentity, 10), // The current user's numeric ID
        current_password: currentPassword,
        new_password: newPassword,
      })
      .then((res) => {
        setMessage(res.data.message || 'Password updated successfully!');
        // Clear fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      })
      .catch((err) => {
        setMessage(err.response?.data?.error || 'Failed to update password');
      });
  };

  return (
    <div className="dashboard">
      <Sidebar
        user={user}
        activePage="settings"
        onLogout={onLogout}
        userRole={userRole}
      />
      <div className="content">
        <div className="table-container">
          <h2>Settings</h2>

          {/* Update Name (mocked) */}
          <form onSubmit={handleNameChange} className="form-container">
            <label style={{ fontSize: '1rem' }}>
              Update Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                style={{ marginLeft: '10px' }}
              />
            </label>
            <button type="submit" className="download-report-btn">
              Save Changes
            </button>
          </form>

          {/* Update Password (real) */}
          <form onSubmit={handlePasswordUpdate} className="form-container">
            <h3>Update Password</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '1rem' }}>
                Current Password:
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="form-input"
                  style={{ marginLeft: '10px', width: '100%' }}
                />
              </label>
              <label style={{ fontSize: '1rem' }}>
                New Password:
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-input"
                  style={{ marginLeft: '10px', width: '100%' }}
                />
              </label>
              <label style={{ fontSize: '1rem' }}>
                Confirm New Password:
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="form-input"
                  style={{ marginLeft: '10px', width: '100%' }}
                />
              </label>
              <button type="submit" className="download-report-btn">
                Update Password
              </button>
            </div>
          </form>

          {/* Language (mock) */}
          <div className="form-container">
            <label style={{ fontSize: '1rem' }}>
              Language:
              <select
                value={language}
                onChange={handleLanguageChange}
                className="form-input"
                style={{ marginLeft: '10px' }}
              >
                <option value="English">English</option>
                <option value="Hebrew">Hebrew</option>
                <option value="Arabic">Arabic</option>
              </select>
            </label>
          </div>

          {/* Theme (mock) */}
          <div className="form-container">
            <label style={{ fontSize: '1rem' }}>
              Theme:
              <select
                value={theme}
                onChange={handleThemeChange}
                className="form-input"
                style={{ marginLeft: '10px' }}
              >
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
              </select>
            </label>
          </div>

          {/* Notifications (mock) */}
          <div style={{ marginTop: '20px' }}>
            <h3>Notification Preferences</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={notifications.alerts}
                  onChange={() => handleNotificationToggle('alerts')}
                />
                Receive Alerts Notifications
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={notifications.reports}
                  onChange={() => handleNotificationToggle('reports')}
                />
                Receive Reports Notifications
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={notifications.shifts}
                  onChange={() => handleNotificationToggle('shifts')}
                />
                Receive Shifts Notifications
              </label>
            </div>
          </div>

          {/* Feedback Message */}
          {message && (
            <p
              style={{
                marginTop: '10px',
                color: message.startsWith('Error') ? '#e74c3c' : '#4caf50',
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
