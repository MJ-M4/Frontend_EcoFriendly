import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/reset.css';
import './css/layout.css';
import './css/components.css';
import './css/themes.css';
import './css/responsive.css';

// Simple hash function for demonstration (not secure for production)
const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16).toUpperCase(); // Convert to hexadecimal
};

const WorkersPage = ({ onLogout, userRole }) => {
  // Mock workers data with workerType and accessCode
  const initialWorkers = [
    { id: 1, identity: '207705096', name: 'Worker 1', phone: '050-123-4567', location: 'Tel Aviv', joiningDate: '01-01-2023', workerType: 'Driver', accessCode: '' },
    { id: 2, identity: '205548491', name: 'Worker 2', phone: '052-987-6543', location: 'Jerusalem', joiningDate: '15-03-2023', workerType: 'Cleaner', accessCode: '' },
    { id: 3, identity: '204987654', name: 'Worker 3', phone: '054-555-1212', location: 'Haifa', joiningDate: '10-06-2023', workerType: 'Maintenance Worker', accessCode: '' },
  ];

  const [workers, setWorkers] = useState(initialWorkers);
  const [searchRegion, setSearchRegion] = useState('');
  const [searchId, setSearchId] = useState('');
  const [newWorker, setNewWorker] = useState({
    id: '',
    name: '',
    phone: '',
    location: '',
    joiningDate: '',
    workerType: 'Driver',
    accessCode: '',
  });

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  const filteredWorkers = workers.filter((worker) => {
    const matchesRegion = worker.location.toLowerCase().includes(searchRegion.toLowerCase());
    const matchesId = worker.identity.toLowerCase().includes(searchId.toLowerCase());
    return matchesRegion && matchesId;
  });

  // Handle generating a random password for the new worker in the Add Worker bar
  const handleGenerateAccessCodeForNewWorker = () => {
    // Generate a random 8-character password (letters, numbers, and special characters)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let randomPassword = '';
    for (let i = 0; i < 8; i++) {
      randomPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setNewWorker({ ...newWorker, accessCode: randomPassword });
  };

  // Handle adding a new worker with hashed password
  const handleAddWorker = () => {
    if (
      newWorker.id &&
      newWorker.name &&
      newWorker.phone &&
      newWorker.location &&
      newWorker.joiningDate &&
      newWorker.workerType &&
      newWorker.accessCode
    ) {
      const hashedAccessCode = simpleHash(newWorker.accessCode);
      const newId = workers.length + 1;
      setWorkers([...workers, { id: newId, identity: newWorker.id, name: newWorker.name, phone: newWorker.phone, location: newWorker.location, joiningDate: newWorker.joiningDate, workerType: newWorker.workerType, accessCode: hashedAccessCode }]);
      setNewWorker({ id: '', name: '', phone: '', location: '', joiningDate: '', workerType: 'Driver', accessCode: '' });
    } else {
      alert('Please fill in all fields and generate an access code to add a worker.');
    }
  };

  const handleDeleteWorker = (id) => {
    setWorkers(workers.filter((worker) => worker.id !== id));
  };

  if (userRole !== 'manager') {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="workers" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Workers</h1>

        {/* Search Bar (Unchanged) */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search by region..."
            value={searchRegion}
            onChange={(e) => setSearchRegion(e.target.value)}
            style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #e0e0e0', fontSize: '1rem' }}
          />
          <input
            type="text"
            placeholder="Search by ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #e0e0e0', fontSize: '1rem' }}
          />
        </div>

        {/* Add Worker Bar (Separate and Continuous) */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="ID"
            value={newWorker.id}
            onChange={(e) => setNewWorker({ ...newWorker, id: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          />
          <input
            type="text"
            placeholder="Name"
            value={newWorker.name}
            onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={newWorker.phone}
            onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Location"
            value={newWorker.location}
            onChange={(e) => setNewWorker({ ...newWorker, location: e.target.value })}
            className="form-input"
          />
          <input
            type="date"
            value={newWorker.joiningDate}
            onChange={(e) => setNewWorker({ ...newWorker, joiningDate: e.target.value })}
            className="form-input"
          />
          <select
            value={newWorker.workerType}
            onChange={(e) => setNewWorker({ ...newWorker, workerType: e.target.value })}
            className="form-input"
          >
            <option value="Driver">Driver</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Maintenance Worker">Maintenance Worker</option>
          </select>
          <input
            type="text"
            placeholder="Access Code (Generate to fill)"
            value={newWorker.accessCode}
            readOnly
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          />
          <button
            onClick={handleGenerateAccessCodeForNewWorker}
            className="download-report-btn"
            style={{ padding: '8px 15px', height: '40px', fontSize: '0.9rem', marginRight: '10px' }}
          >
            Generate Password
          </button>
          <button
            onClick={handleAddWorker}
            className="download-report-btn"
            style={{ padding: '10px 20px', height: '40px', width: '200px' }}
          >
            Add Worker
          </button>
        </div>

        {/* Workers Table */}
        <div className="table-container" style={{ marginBottom: '30px' }}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Location</th>
                <th>Joining Date</th>
                <th>Worker Type</th>
                <th>Access Code</th>
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
                  <td>{worker.accessCode || 'Not Generated'}</td>
                  <td>
                    <button onClick={() => handleDeleteWorker(worker.id)} className="action-btn delete">
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