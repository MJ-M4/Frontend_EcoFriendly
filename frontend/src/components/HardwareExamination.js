// src/components/HardwareExamination.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/general.css';

const HardwareExamination = ({ onLogout, userRole }) => {
  // Mock hardware data with house number
  const initialHardware = [
    { id: 'hw_001', binId: 'bin_1', status: 'Operational', battery: 95, lastChecked: '2025-03-01', location: 'Tel Aviv', houseNumber: '12A' },
    { id: 'hw_002', binId: 'bin_2', status: 'Needs Maintenance', battery: 20, lastChecked: '2025-03-02', location: 'Jerusalem', houseNumber: '45B' },
    { id: 'hw_003', binId: 'bin_3', status: 'Operational', battery: 88, lastChecked: '2025-03-03', location: 'Haifa', houseNumber: '78C' },
  ];

  const [hardware, setHardware] = useState(initialHardware);
  const [searchTerm, setSearchTerm] = useState('');
  const [newHardware, setNewHardware] = useState({
    id: '',
    binId: '',
    houseNumber: '',
  });

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  // Filter hardware by bin ID, location, or house number
  const filteredHardware = hardware.filter(
    (hw) =>
      hw.binId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hw.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hw.houseNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle marking hardware as maintained
  const handleMarkAsMaintained = (id) => {
    const currentDate = new Date().toISOString().split('T')[0]; // Use current date
    setHardware(
      hardware.map((hw) =>
        hw.id === id
          ? { ...hw, status: 'Operational', battery: 100, lastChecked: currentDate }
          : hw
      )
    );
  };

  // Handle adding a new hardware entry
  const handleAddHardware = () => {
    if (newHardware.id && newHardware.binId && newHardware.houseNumber) {
      setHardware([
        ...hardware,
        {
          id: newHardware.id,
          binId: newHardware.binId,
          houseNumber: newHardware.houseNumber,
          status: 'Operational', // Default status for new hardware
          battery: 100, // Default battery level
          lastChecked: new Date().toISOString().split('T')[0], // Current date
          location: 'Unknown', // Default location (can be updated later)
        },
      ]);
      setNewHardware({ id: '', binId: '', houseNumber: '' }); // Reset form
    } else {
      alert('Please fill in all fields (Hardware ID, Bin ID, and House Number) to add hardware.');
    }
  };

  // Handle input change for new hardware form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHardware((prev) => ({ ...prev, [name]: value }));
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
        <div className="form-container">
          <input
            type="text"
            placeholder="Search by bin ID, location, or house number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Add Hardware Form */}
        <div className="form-container">
          <input
            type="text"
            name="id"
            placeholder="Hardware ID"
            value={newHardware.id}
            onChange={handleInputChange}
            className="form-input"
            required
          />
          <input
            type="text"
            name="binId"
            placeholder="Bin ID"
            value={newHardware.binId}
            onChange={handleInputChange}
            className="form-input"
            required
          />
          <input
            type="text"
            name="houseNumber"
            placeholder="House Number"
            value={newHardware.houseNumber}
            onChange={handleInputChange}
            className="form-input"
            required
          />
          <button onClick={handleAddHardware} className="download-report-btn">
            Add Hardware
          </button>
        </div>

        {/* Hardware Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Hardware ID</th>
                <th>Bin ID</th>
                <th>Location</th>
                <th>House Number</th> {/* Added House Number column */}
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
                  <td>{hw.houseNumber}</td> {/* Display House Number */}
                  <td>{hw.status}</td>
                  <td>{hw.battery}%</td>
                  <td>{hw.lastChecked}</td>
                  <td>
                    {hw.status === 'Needs Maintenance' && (
                      <button
                        onClick={() => handleMarkAsMaintained(hw.id)}
                        className="mark-maintained-btn"
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

export default HardwareExamination;