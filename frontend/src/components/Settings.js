// src/components/Settings.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/general.css';

const SettingsPage = ({ onLogout, userRole }) => { // Add userRole prop
  const [name, setName] = useState('Mohamed Mhagne');
  const [message, setMessage] = useState('');

  const user = { name, avatar: '/images/sami.png' };

  const handleNameChange = (e) => {
    e.preventDefault();
    try {
      // Simulate a successful update (since we're not using a backend)
      setMessage('Name updated successfully!');
    } catch (err) {
      setMessage('Error: Failed to update name');
    }
  };

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="settings" onLogout={onLogout} userRole={userRole} /> {/* Pass userRole */}
      <div className="content">
        <div className="table-container">
          <h2>Settings</h2>
          <form onSubmit={handleNameChange} style={{ marginTop: '20px' }}>
            <label style={{ fontSize: '1rem', marginRight: '10px' }}>
              Update Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  padding: '10px',
                  marginLeft: '10px',
                  borderRadius: '5px',
                  border: '1px solid #e0e0e0',
                  fontSize: '1rem',
                }}
              />
            </label>
            <button type="submit" className="download-report-btn">
              Save Changes
            </button>
          </form>
          {message && <p style={{ marginTop: '10px', color: message.startsWith('Error') ? '#e74c3c' : '#4caf50' }}>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;