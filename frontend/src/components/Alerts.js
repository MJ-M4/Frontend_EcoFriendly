// src/components/Alerts.js
import React, { useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import './css/general.css';
import Sidebar from './Sidebar';

const AlertsPage = ({ onLogout, userRole }) => { // Add userRole prop
  // Mock data (since we're not using a backend)
  const mockAlerts = [
    { id: 1, binId: 'bin_1', type: 'Critical', message: 'Bin is full', time: '10:00', date: '15-1-2025' },
    { id: 2, binId: 'bin_2', type: 'Warning', message: 'Low battery', time: '12:30', date: '15-1-2025' },
    { id: 3, binId: 'bin_3', type: 'Critical', message: 'Bin is full', time: '14:00', date: '16-1-2025' },
  ];

  const [alerts, setAlerts] = useState(mockAlerts); // Use mock data
  const [loading, setLoading] = useState(false); // No need for loading since we're using mock data
  const [error, setError] = useState(null);

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  // Comment out the API fetch for now (you can uncomment this when you have a backend)
  /*
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/alerts');
        if (!response.ok) {
          throw new Error('Failed to fetch alerts');
        }
        const data = await response.json();
        setAlerts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);
  */

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="alerts" onLogout={onLogout} userRole={userRole} /> {/* Pass userRole */}
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
                    <FaExclamationTriangle style={{ color: alert.type === 'Critical' ? '#ff4d4f' : '#ffeb3b', marginRight: '8px' }} />
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