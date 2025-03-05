// src/components/Settings.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/general.css';

const SettingsPage = ({ onLogout, userRole }) => {
  const [name, setName] = useState('Mohamed Mhagne');
  const [language, setLanguage] = useState('English'); // Default language
  const [theme, setTheme] = useState('Light'); // Default theme
  const [notifications, setNotifications] = useState({
    alerts: true,
    reports: true,
    shifts: false,
  });
  const [message, setMessage] = useState('');

  const user = { name, avatar: '/images/sami.png' };

  // Handle name update
  const handleNameChange = (e) => {
    e.preventDefault();
    try {
      setMessage('Name updated successfully!');
    } catch (err) {
      setMessage('Error: Failed to update name');
    }
  };

  // Handle language change
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setMessage(`Language updated to ${e.target.value}!`);
    // In a real app, integrate with a localization library like i18next here
  };

  // Handle theme change
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    setMessage(`Theme updated to ${e.target.value}!`);
    // In a real app, apply the theme by updating CSS variables or classes
    document.body.className = e.target.value.toLowerCase() + '-theme';
  };

  // Handle notification toggle
  const handleNotificationToggle = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
    setMessage(`Notifications for ${type} ${notifications[type] ? 'disabled' : 'enabled'}!`);
  };

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="settings" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <div className="table-container">
          <h2>Settings</h2>

          {/* Update Name */}
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

          {/* Language Selection */}
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

          {/* Theme Selection */}
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

          {/* Notification Preferences */}
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