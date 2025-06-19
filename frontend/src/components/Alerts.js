<<<<<<< HEAD
import React, { useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './Sidebar';
import './css/alerts.css';
import './css/global.css';

const AlertsPage = ({ onLogout, userRole,user }) => {
=======
import React from 'react';
import PageTemplate from './PageTemplate';

const AlertsPage = ({ onLogout, userRole, userName }) => {
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
  const mockAlerts = [
    { id: '28f9a440-d', type: 'Critical', message: 'Bin is full', time: '10:00', date: '15-1-2025' },
    { id: '08e6b29a-8', type: 'Warning', message: 'Low battery', time: '12:30', date: '15-1-2025' },
    { id: '1b627d42-3', type: 'Critical', message: 'Bin is full', time: '14:00', date: '16-1-2025' },
  ];
<<<<<<< HEAD
  const [alerts] = useState(mockAlerts);
  const [loading] = useState(false);
  const [error] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Add state for sidebar toggle


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
=======

  return (
    <PageTemplate title="Alerts" onLogout={onLogout} userRole={userRole} userName={userName} activePage="alerts">
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
            {mockAlerts.map((alert) => (
              <tr key={alert.id}>
                <td>{alert.id}</td>
                <td>{alert.type}</td>
                <td>{alert.message}</td>
                <td>{alert.time}</td>
                <td>{alert.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
      </div>
    </PageTemplate>
  );
};

export default AlertsPage;