import React from 'react';
import PageTemplate from './PageTemplate';

const AlertsPage = ({ onLogout, userRole, userName }) => {
  const mockAlerts = [
    { id: '28f9a440-d', type: 'Critical', message: 'Bin is full', time: '10:00', date: '15-1-2025' },
    { id: '08e6b29a-8', type: 'Warning', message: 'Low battery', time: '12:30', date: '15-1-2025' },
    { id: '1b627d42-3', type: 'Critical', message: 'Bin is full', time: '14:00', date: '16-1-2025' },
  ];

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
      </div>
    </PageTemplate>
  );
};

export default AlertsPage;