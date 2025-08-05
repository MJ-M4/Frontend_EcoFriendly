import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './css/settings.css';

const SettingsPage = ({ onLogout, userRole, user }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'Light');
  const [notifications, setNotifications] = useState({
    alerts: true,
    reports: true,
    shifts: false,
  });
  const [message, setMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.className = `${theme.toLowerCase()}-theme`;
  }, [theme]);

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    document.body.className = `${selectedTheme.toLowerCase()}-theme`;
    setMessage(`Theme updated to ${selectedTheme}!`);
  };

  const handleNotificationToggle = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
    setMessage(`Notifications for ${type} ${notifications[type] ? 'disabled' : 'enabled'}!`);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard">
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
        {isSidebarOpen ? '✖' : '☰'}
      </button>
      <Sidebar user={user} activePage="settings" onLogout={onLogout} userRole={userRole} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="content">
        <div className="settings-container">
          <h2 className="settings-title">Settings</h2>
          <p className="settings-subtitle">Customize your experience</p>

          <div className="settings-grid">
            <div className="settings-card">
              <h3>Preferences</h3>

              <div className="settings-form">
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
