import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Sidebar from './Sidebar';
import './css/reset.css';
import './css/layout.css';
import './css/components.css';
import './css/themes.css';
import './css/responsive.css';

const ReportsPage = ({ onLogout, userRole }) => {
  const mockReports = [
    { id: 'bin_10', status: 'Full', capacity: 90, location: 'nazareth, 4 088', lastCollected: '18-1-2025' },
    { id: 'bin_11', status: 'Near Full', capacity: 55, location: 'nazareth, anis kardosh 26', lastCollected: '14-1-2025' },
    { id: 'bin_12', status: 'Full', capacity: 95, location: 'nazareth, 2 6057', lastCollected: '16-1-2025' },
    { id: 'bin_13', status: 'Not Full', capacity: 12, location: 'nazareth, 4 6030', lastCollected: '15-1-2025' },
    { id: 'bin_14', status: 'Not Full', capacity: 15, location: 'nazareth, 8 6116', lastCollected: '15-1-2025' },
  ];

  const [reports, setReports] = useState(mockReports);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Full':
        return <FaTrash className="status-icon full" />;
      case 'Near Full':
        return <FaTrash className="status-icon near-full" />;
      case 'Not Full':
        return <FaTrash className="status-icon not-full" />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="reports" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <div className="table-container reports-table">
          <table>
            <thead>
              <tr>
                <th>ID_bin</th>
                <th>Status</th>
                <th>Capacity</th>
                <th>Location</th>
                <th>Last Collected</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>
                    {getStatusIcon(report.status)}
                    {report.status}
                  </td>
                  <td>{report.capacity}%</td>
                  <td>{report.location}</td>
                  <td>{report.lastCollected}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="download-report-container">
          <button className="download-report-btn">Download Report</button>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;