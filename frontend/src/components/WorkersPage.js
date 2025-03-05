// src/components/WorkersPage.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/general.css';

const WorkersPage = ({ onLogout, userRole }) => {
  // Updated mock workers data with workerType
  const initialWorkers = [
    { id: 1, identity: 'ID001', name: 'Worker 1', phone: '050-123-4567', location: 'Tel Aviv', joiningDate: '01-01-2023', workerType: 'Driver' },
    { id: 2, identity: 'ID002', name: 'Worker 2', phone: '052-987-6543', location: 'Jerusalem', joiningDate: '15-03-2023', workerType: 'Cleaner' },
    { id: 3, identity: 'ID003', name: 'Worker 3', phone: '054-555-1212', location: 'Haifa', joiningDate: '10-06-2023', workerType: 'Maintenance Worker' },
  ];

  const [workers, setWorkers] = useState(initialWorkers);
  const [searchTerm, setSearchTerm] = useState('');
  const [newWorker, setNewWorker] = useState({
    identity: '',
    name: '',
    phone: '',
    location: '',
    joiningDate: '',
    workerType: 'Driver', // Default worker type
  });

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  // Filter workers by location
  const filteredWorkers = workers.filter((worker) =>
    worker.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding a new worker
  const handleAddWorker = () => {
    if (
      newWorker.identity &&
      newWorker.name &&
      newWorker.phone &&
      newWorker.location &&
      newWorker.joiningDate &&
      newWorker.workerType
    ) {
      const newId = workers.length + 1;
      setWorkers([...workers, { id: newId, ...newWorker }]);
      setNewWorker({ identity: '', name: '', phone: '', location: '', joiningDate: '', workerType: 'Driver' });
    } else {
      alert('Please fill in all fields to add a worker.');
    }
  };

  // Handle deleting a worker
  const handleDeleteWorker = (id) => {
    setWorkers(workers.filter((worker) => worker.id !== id));
  };

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="workers" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Workers</h1>

        {/* Search Box */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by region..."
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

        {/* Add Worker Form */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Identity"
            value={newWorker.identity}
            onChange={(e) => setNewWorker({ ...newWorker, identity: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0' }}
          />
          <input
            type="text"
            placeholder="Name"
            value={newWorker.name}
            onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0' }}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={newWorker.phone}
            onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0' }}
          />
          <input
            type="text"
            placeholder="Location"
            value={newWorker.location}
            onChange={(e) => setNewWorker({ ...newWorker, location: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0' }}
          />
          <input
            type="date"
            value={newWorker.joiningDate}
            onChange={(e) => setNewWorker({ ...newWorker, joiningDate: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0' }}
          />
          <select
            value={newWorker.workerType}
            onChange={(e) => setNewWorker({ ...newWorker, workerType: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0' }}
          >
            <option value="Driver">Driver</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Maintenance Worker">Maintenance Worker</option>
          </select>
          <button
            onClick={handleAddWorker}
            className="download-report-btn"
            style={{ padding: '10px 20px', height: '40px', width: '200px', margin: '5px' }}
          >
            Add Worker
          </button>
        </div>

        {/* Workers Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Identity</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Location</th>
                <th>Joining Date</th>
                <th>Worker Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkers.map((worker) => (
                <tr key={worker.id}>
                  <td>{worker.identity}</td>
                  <td>{worker.name}</td>
                  <td>{worker.phone}</td>
                  <td>{worker.location}</td>
                  <td>{worker.joiningDate}</td>
                  <td>{worker.workerType}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteWorker(worker.id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#ff4d4f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
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

export default WorkersPage;