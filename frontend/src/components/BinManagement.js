import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/reset.css';
import './css/layout.css';
import './css/components.css';
import './css/themes.css';
import './css/responsive.css';

const BinManagementPage = ({ onLogout, userRole }) => {
  const initialBins = [
    { id: 'bin_1', location: 'Tel Aviv', status: 'Full', assignedWorker: 'Worker 1' },
    { id: 'bin_2', location: 'Jerusalem', status: 'Full', assignedWorker: 'Unassigned' },
    { id: 'bin_3', location: 'Haifa', status: 'Full', assignedWorker: 'Worker 3' },
    { id: 'bin_4', location: 'Nazareth', status: 'Full', assignedWorker: 'Unassigned' },
    { id: 'bin_5', location: 'Eilat', status: 'Full', assignedWorker: 'Worker 2' },
  ];

  const workers = [
    { id: 1, name: 'Worker 1', workerType: 'Driver' },
    { id: 2, name: 'Worker 2', workerType: 'Cleaner' },
    { id: 3, name: 'Worker 3', workerType: 'Maintenance Worker' },
  ];

  const [bins, setBins] = useState(initialBins);
  const [searchTerm, setSearchTerm] = useState('');
  const [newBin, setNewBin] = useState({ id: '', location: '' });

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  const filteredBins = bins.filter((bin) =>
    bin.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bin.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bin.assignedWorker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignWorker = (binId, workerName) => {
    setBins(bins.map((bin) => (bin.id === binId ? { ...bin, assignedWorker: workerName } : bin)));
  };

  const handleAddBin = () => {
    if (newBin.id && newBin.location) {
      setBins([...bins, { id: newBin.id, location: newBin.location, status: 'Empty', assignedWorker: 'Unassigned' }]);
      setNewBin({ id: '', location: '' });
    } else {
      alert('Please fill in all fields to add a bin.');
    }
  };

  const handleDeleteBin = (binId) => {
    setBins(bins.filter((bin) => bin.id !== binId));
  };

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="bin-management" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Bin Management</h1>
        <div className="form-container">
          <input
            type="text"
            placeholder="Search by bin ID, location, or assigned worker..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="form-container bin-form">
          <input
            type="text"
            placeholder="Bin ID"
            value={newBin.id}
            onChange={(e) => setNewBin({ ...newBin, id: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Location"
            value={newBin.location}
            onChange={(e) => setNewBin({ ...newBin, location: e.target.value })}
            className="form-input"
          />
          <button onClick={handleAddBin} className="download-report-btn">
            Add Bin
          </button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Bin ID</th>
                <th>Location</th>
                <th>Status</th>
                <th>Assigned Worker</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBins.map((bin) => (
                <tr key={bin.id}>
                  <td>{bin.id}</td>
                  <td>{bin.location}</td>
                  <td>{bin.status}</td>
                  <td>
                    <select
                      value={bin.assignedWorker}
                      onChange={(e) => handleAssignWorker(bin.id, e.target.value)}
                      className="form-input"
                    >
                      <option value="Unassigned">Unassigned</option>
                      {workers.map((worker) => (
                        <option key={worker.id} value={worker.name}>
                          {worker.name} ({worker.workerType})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteBin(bin.id)} className="action-btn delete">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BinManagementPage;