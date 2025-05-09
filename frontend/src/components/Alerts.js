import React, { useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './Sidebar';
import './css/alerts.css';

const AlertsPage = ({ onLogout, userRole }) => {
  const mockAlerts = [
    {
      binId: uuidv4().slice(0, 10),
      type: 'Critical',
      message: 'Bin is full',
      eventTime: '10:00',
      date: '15-1-2025',
    },
    {
      binId: uuidv4().slice(0, 10),
      type: 'Warning',
      message: 'Low battery',
      eventTime: '12:30',
      date: '15-1-2025',
    },
    {
      binId: uuidv4().slice(0, 10),
      type: 'Critical',
      message: 'Bin is full',
      eventTime: '14:00',
      date: '16-1-2025',
    },
  ];
  const [alerts] = useState(mockAlerts);
  const [loading] = useState(false);
  const [error] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Add state for sidebar toggle

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard">
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
        {isSidebarOpen ? '✖' : '☰'}
      </button>
      <Sidebar
        user={user}
        activePage="alerts"
        onLogout={onLogout}
        userRole={userRole}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="content">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Bin ID</th>
                <th>Alert Type</th>
                <th>Message</th>
                <th>Event Time</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr key={alert.binId}>
                  <td data-label="Bin ID">{alert.binId}</td>
                  <td data-label="Alert Type">
                    <FaExclamationTriangle
                      style={{
                        color: alert.type === 'Critical' ? '#ff4d4f' : '#ffeb3b',
                        marginRight: '8px',
                      }}
                    />
                    {alert.type}
                  </td>
                  <td data-label="Message">{alert.message}</td>
                  <td data-label="Event Time">{alert.eventTime}</td>
                  <td data-label="Date">{alert.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;