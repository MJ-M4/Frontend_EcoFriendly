import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/reset.css';
import './css/layout.css';
import './css/components.css';
import './css/themes.css';
import './css/responsive.css';

const SettingsPage = ({ onLogout, userRole }) => {
  const [name, setName] = useState('Mohamed Mhagne');
  const [language, setLanguage] = useState('English');
  const [theme, setTheme] = useState('Light');
  const [notifications, setNotifications] = useState({
    alerts: true,
    reports: true,
    shifts: false,
  });
  const [message, setMessage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const user = { name, avatar: '/images/sami.png' };

  const handleNameChange = (e) => {
    e.preventDefault();
    try {
      setMessage('Name updated successfully!');
    } catch (err) {
      setMessage('Error: Failed to update name');
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setMessage(`Language updated to ${e.target.value}!`);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    setMessage(`Theme updated to ${e.target.value}!`);
    document.body.className = e.target.value.toLowerCase() + '-theme';
  };

  const handleNotificationToggle = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
    setMessage(`Notifications for ${type} ${notifications[type] ? 'disabled' : 'enabled'}!`);
  };

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
      setMessage('Error: New password must be different from the current password.');
      return;
    }
    setTimeout(() => {
      setMessage('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }, 1000);
  };

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="settings" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <div className="table-container">
          <h2>Settings</h2>
          <form onSubmit={handleNameChange} className="form-container">
            <label>
              Update Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </label>
            <button type="submit" className="download-report-btn">
              Save Changes
            </button>
          </form>
          <form onSubmit={handlePasswordUpdate} className="form-container">
            <h3>Update Password</h3>
            <div className="password-form">
              <label>
                Current Password:
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="form-input"
                />
              </label>
              <label>
                New Password:
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-input"
                />
              </label>
              <label>
                Confirm New Password:
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="form-input"
                />
              </label>
              <button type="submit" className="download-report-btn">
                Update Password
              </button>
            </div>
          </form>
          <div className="form-container">
            <label>
              Language:
              <select value={language} onChange={handleLanguageChange} className="form-input">
                <option value="English">English</option>
                <option value="Hebrew">Hebrew</option>
                <option value="Arabic">Arabic</option>
              </select>
            </label>
          </div>
          <div className="form-container">
            <label>
              Theme:
              <select value={theme} onChange={handleThemeChange} className="form-input">
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
              </select>
            </label>
          </div>
          <div className="notification-settings">
            <h3>Notification Preferences</h3>
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
          {message && (
            <p className={message.startsWith('Error') ? 'error-message' : 'success-message'}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;