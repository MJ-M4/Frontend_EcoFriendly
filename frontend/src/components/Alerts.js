import React, { useEffect, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import Sidebar from './Sidebar';
import './css/alerts.css';
import './css/global.css';
import { getBinsApi, getHardwareApi } from './apis';

const AlertsPage = ({ onLogout, userRole, user }) => {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch bins
        const binsRes = await fetch(getBinsApi);
        const binsData = await binsRes.json();

        // Fetch hardware
        const hardwareRes = await fetch(getHardwareApi);
        const hardwareData = await hardwareRes.json();

        let alertsArr = [];

        // Bin alerts (full)
        if (binsData.bins) {
          binsData.bins.forEach(bin => {
            if (bin.status === 'Full') {
              alertsArr.push({
                binId: bin.binId,
                type: 'Critical',
                message: 'Bin is full',
                eventTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                date: new Date().toLocaleDateString('en-GB'),
              });
            }
          });
        }

        // Hardware alerts (battery low)
        if (hardwareData.hardware) {
          hardwareData.hardware.forEach(hw => {
            if (hw.battery < 40) {
              alertsArr.push({
                binId: hw.binId || hw.id,
                type: 'Warning',
                message: 'Low battery',
                eventTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                date: new Date().toLocaleDateString('en-GB'),
              });
            }
          });
        }

        setAlerts(alertsArr);
      } catch (err) {
        setError('Failed to fetch alerts');
        setAlerts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 10000); // auto-refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };


  if (error) return <div className="error">Error: {error}</div>;

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
        <h1>Alerts</h1>
        {isLoading ? (
          <div>Loading alerts...</div>
        ) : (
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
              {alerts.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: '#888' }}>
                    No alerts 🎉
                  </td>
                </tr>
              ) : (
                alerts.map((alert, i) => (
                  <tr key={alert.binId + alert.message + i}>
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
                ))
              )}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;
// This code defines a React component for displaying alerts related to bins and hardware. It fetches data from a local server, processes it to identify critical and warning alerts, and displays them in a table format. The component also includes a sidebar for navigation and a button to toggle the sidebar visibility.
// The alerts are fetched every 10 seconds, and the component handles loading and error states gracefully   