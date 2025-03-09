import axios from 'axios';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/general.css';

// Simple hash function for demonstration (NOT secure for production)
const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16).toUpperCase();
};

const WorkersPage = ({ onLogout, userRole }) => {
<<<<<<< HEAD
=======
  // Mock workers data with workerType and accessCode
>>>>>>> ca94723692410c869d8c94b7f934350623d48d10
  const initialWorkers = [
    { id: 1, identity: '207705096', name: 'Worker 1', phone: '050-123-4567', location: 'Tel Aviv', joiningDate: '01-01-2023', workerType: 'Driver', accessCode: '' },
    { id: 2, identity: '205548491', name: 'Worker 2', phone: '052-987-6543', location: 'Jerusalem', joiningDate: '15-03-2023', workerType: 'Cleaner', accessCode: '' },
    { id: 3, identity: '204987654', name: 'Worker 3', phone: '054-555-1212', location: 'Haifa', joiningDate: '10-06-2023', workerType: 'Maintenance Worker', accessCode: '' },
  ];

  const [workers, setWorkers] = useState(initialWorkers);
  const [searchRegion, setSearchRegion] = useState('');
  const [searchId, setSearchId] = useState('');
  const [newWorker, setNewWorker] = useState({
    identity: '',
    name: '',
    phone: '',
    location: '',
    joiningDate: '',
    role: 'worker',
    workerType: 'Driver',
    accessCode: '',
  });

  const user = { name: 'ManagerUser', avatar: '/images/sami.png' };

  const filteredWorkers = workers.filter((worker) => {
    const regionMatch = worker.location?.toLowerCase().includes(searchRegion.toLowerCase());
    const idMatch = String(worker.identity).toLowerCase().includes(searchId.toLowerCase());
    return regionMatch && idMatch;
  });

<<<<<<< HEAD
=======
  // Handle generating a random password for the new worker in the Add Worker bar
  const handleGenerateAccessCodeForNewWorker = () => {
    // Generate a random 8-character password (letters, numbers, and special characters)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let randomPassword = '';
    for (let i = 0; i < 8; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewWorker({ ...newWorker, accessCode: pass });
  };

  // Handle adding a new worker with hashed password
>>>>>>> ca94723692410c869d8c94b7f934350623d48d10
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

  const handleDeleteWorker = async (workerId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${workerId}`);
      setWorkers(workers.filter((w) => w.id !== workerId));
    } catch (error) {
      alert('Failed to delete user');
    }
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
>>>>>>> ca94723692410c869d8c94b7f934350623d48d10
          <input
            type="text"
            placeholder="Search by region..."
            value={searchRegion}
            onChange={(e) => setSearchRegion(e.target.value)}
<<<<<<< HEAD
            className="search-input"
=======
            style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #e0e0e0', fontSize: '1rem' }}
>>>>>>> ca94723692410c869d8c94b7f934350623d48d10
          />
          <input
            type="text"
            placeholder="Search by ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
<<<<<<< HEAD
            className="search-input"
          />
        </div>
        <div className="form-container worker-form">
          <input
            type="text"
            placeholder="Identity"
            value={newWorker.identity}
            onChange={(e) => setNewWorker({ ...newWorker, identity: e.target.value })}
            className="form-input"
=======
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
>>>>>>> ca94723692410c869d8c94b7f934350623d48d10
          />
          <input
            type="text"
            placeholder="Name"
            value={newWorker.name}
            onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
            style={{ padding: '10px', width: '150px' }}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={newWorker.phone}
            onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })}
            style={{ padding: '10px', width: '150px' }}
          />
          <input
            type="text"
            placeholder="Location"
            value={newWorker.location}
            onChange={(e) => setNewWorker({ ...newWorker, location: e.target.value })}
            style={{ padding: '10px', width: '150px' }}
          />
          <input
            type="date"
            value={newWorker.joiningDate}
            onChange={(e) => setNewWorker({ ...newWorker, joiningDate: e.target.value })}
            style={{ padding: '10px', width: '150px' }}
            placeholder="mm/dd/yyyy"
          />
          <select
            value={newWorker.role}
            onChange={(e) => setNewWorker({ ...newWorker, role: e.target.value })}
            style={{ padding: '10px', width: '120px' }}
          >
            <option value="worker">Worker</option>
            <option value="manager">Manager</option>
          </select>
          <select
            value={newWorker.workerType}
            onChange={(e) => setNewWorker({ ...newWorker, workerType: e.target.value })}
            disabled={newWorker.role !== 'worker'}
            style={{ padding: '10px', width: '150px' }}
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
            style={{ padding: '10px', width: '200px' }}
          />
          <button className="action-button" onClick={handleGenerateAccessCode}>
            Generate Password
          </button>
          <button className="action-button" onClick={handleAddWorker}>
            Add Worker
          </button>
        </div>

        {/* Workers Table */}
        <div className="table-container" style={{ marginBottom: '30px' }}>
>>>>>>> ca94723692410c869d8c94b7f934350623d48d10
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Numeric ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Joining Date</th>
                <th>Role</th>
                <th>Worker Type</th>
                <th>Access Code (hashed)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkers.map((worker) => (
                <tr key={worker.id}>
                  <td>{worker.id}</td>
                  <td>{worker.identity}</td>
                  <td>{worker.name}</td>
                  <td>{worker.phone}</td>
                  <td>{worker.location}</td>
                  <td>{worker.joiningDate}</td>
                  <td>{worker.role}</td>
                  <td>{worker.workerType || '-'}</td>
                  <td>{worker.accessCode || 'N/A'}</td>
                  <td>
                    <button className="delete-button" onClick={() => handleDeleteWorker(worker.id)}>
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