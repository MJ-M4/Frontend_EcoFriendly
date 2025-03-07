// src/components/Reports.js
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import './css/general.css';
import Sidebar from './Sidebar';

const ReportsPage = ({ onLogout }) => {
  // Mock data (since we're not using a backend)
  const mockReports = [
    { id: 'bin_10', status: 'Full', capacity: 90, location: 'nazareth, 4 088', lastCollected: '18-1-2025' },
    { id: 'bin_11', status: 'Near Full', capacity: 55, location: 'nazareth, anis kardosh 26', lastCollected: '14-1-2025' },
    { id: 'bin_12', status: 'Full', capacity: 95, location: 'nazareth, 2 6057', lastCollected: '16-1-2025' },
    { id: 'bin_13', status: 'Not Full', capacity: 12, location: 'nazareth, 4 6030', lastCollected: '15-1-2025' },
    { id: 'bin_14', status: 'Not Full', capacity: 15, location: 'nazareth, 8 6116', lastCollected: '15-1-2025' },
  ];

  const [reports, setReports] = useState(mockReports); // Use mock data
  const [loading, setLoading] = useState(false); // No need for loading since we're using mock data
  const [error, setError] = useState(null);

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  // Comment out the API fetch for now (you can uncomment this when you have a backend)
  /*
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/reports');
        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }
        const data = await response.json();
        setReports(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);
  */

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Full':
        return <FaTrash style={{ color: '#ff4d4f', marginRight: '8px' }} />;
      case 'Near Full':
        return <FaTrash style={{ color: '#ffeb3b', marginRight: '8px' }} />;
      case 'Not Full':
        return <FaTrash style={{ color: '#4caf50', marginRight: '8px' }} />;
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
      <Sidebar user={user} activePage="reports" onLogout={onLogout} />
      <div className="content">
        <div className="table-container reports-table">
          <table>
            <thead>
              <tr>
                <th>ID_bin</th>
                <th>status</th>
                <th>capacity</th>
                <th>location</th>
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