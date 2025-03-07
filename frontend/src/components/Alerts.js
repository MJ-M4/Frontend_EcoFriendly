import React, { useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import Sidebar from './Sidebar';
import './css/reset.css';
import './css/layout.css';
import './css/components.css';
import './css/themes.css';
import './css/responsive.css';

const AlertsPage = ({ onLogout, userRole }) => {
  const mockAlerts = [
    { id: 1, binId: 'bin_1', type: 'Critical', message: 'Bin is full', time: '10:00', date: '15-1-2025' },
    { id: 2, binId: 'bin_2', type: 'Warning', message: 'Low battery', time: '12:30', date: '15-1-2025' },
    { id: 3, binId: 'bin_3', type: 'Critical', message: 'Bin is full', time: '14:00', date: '16-1-2025' },
  ];

  const [alerts, setAlerts] = useState(mockAlerts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="alerts" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Bin ID</th>
                <th>Alert Type</th>
                <th>Message</th>
                <th>Time</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr key={alert.id}>
                  <td>{alert.binId}</td>
                  <td>
                    <FaExclamationTriangle className={`alert-icon ${alert.type.toLowerCase()}`} />
                    {alert.type}
                  </td>
                  <td>{alert.message}</td>
                  <td>{alert.time}</td>
                  <td>{alert.date}</td>
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