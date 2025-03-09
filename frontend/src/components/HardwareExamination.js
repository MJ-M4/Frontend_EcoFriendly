// src/components/HardwareExamination.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/general.css';

const HardwareExamination = ({ onLogout, userRole }) => {
  // Mock hardware data
  const initialHardware = [
    { id: 'hw_001', binId: 'bin_1', status: 'Operational', battery: 95, lastChecked: '2025-03-01', location: 'Tel Aviv' },
    { id: 'hw_002', binId: 'bin_2', status: 'Needs Maintenance', battery: 20, lastChecked: '2025-03-02', location: 'Jerusalem' },
    { id: 'hw_003', binId: 'bin_3', status: 'Operational', battery: 88, lastChecked: '2025-03-03', location: 'Haifa' },
  ];

  const [hardware, setHardware] = useState(initialHardware);
  const [searchTerm, setSearchTerm] = useState('');

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  // Filter hardware by bin ID or location
  const filteredHardware = hardware.filter(
    (hw) =>
      hw.binId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hw.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle marking hardware as maintained (local state update)
  const handleMarkAsMaintained = (id) => {
    setHardware(
      hardware.map((hw) =>
        hw.id === id
          ? { ...hw, status: 'Operational', battery: 100, lastChecked: '2025-03-06' }
          : hw
      )
    );
  };

  // Restrict access to managers only
  if (userRole !== 'manager') {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="hardware-examination" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Hardware Examination</h1>

        {/* Search Box */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by bin ID or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px',
              width: '300px',
              borderRadius: '5px',
              border: '1px solid #e0e0e0',
              fontSize: '1rem',
            }}
          />
        </div>

        {/* Hardware Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Hardware ID</th>
                <th>Bin ID</th>
                <th>Location</th>
                <th>Status</th>
                <th>Battery</th>
                <th>Last Checked</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHardware.map((hw) => (
                <tr key={hw.id}>
                  <td>{hw.id}</td>
                  <td>{hw.binId}</td>
                  <td>{hw.location}</td>
                  <td>{hw.status}</td>
                  <td>{hw.battery}%</td>
                  <td>{hw.lastChecked}</td>
                  <td>
                    {hw.status === 'Needs Maintenance' && (
                      <button
                        onClick={() => handleMarkAsMaintained(hw.id)}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#4caf50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        Mark as Maintained
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="download-report-container">
          <button
            className="download-report-btn"
            onClick={() => alert('Hardware report downloaded!')}
          >
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default HardwareExamination