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
  const [workers, setWorkers] = useState([]);
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

  const handleGenerateAccessCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let pass = '';
    for (let i = 0; i < 8; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewWorker({ ...newWorker, accessCode: pass });
  };

  const handleAddWorker = async () => {
    const { identity, name, phone, location, joiningDate, role, workerType, accessCode } = newWorker;
    if (!identity || !name || !phone || !location || !joiningDate || !accessCode) {
      alert('Please fill in all fields and generate a password!');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/register', {
        identity: parseInt(identity, 10),
        password: accessCode,
        role: role,
        worker_type: role === 'worker' ? workerType : null,
        phone,
        location,
      });
      alert(response.data.message || 'User registered!');
      const newId = Date.now();
      setWorkers([...workers, {
        id: newId,
        identity,
        name,
        phone,
        location,
        joiningDate,
        role,
        workerType,
        accessCode: simpleHash(accessCode),
      }]);
      setNewWorker({
        identity: '',
        name: '',
        phone: '',
        location: '',
        joiningDate: '',
        role: 'worker',
        workerType: 'Driver',
        accessCode: '',
      });
    } catch (error) {
      alert(error.response?.data?.error || 'Error creating user');
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

        {/* Search Bar */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search by region..."
            value={searchRegion}
            onChange={(e) => setSearchRegion(e.target.value)}
            style={{ padding: '10px', width: '250px' }}
          />
          <input
            type="text"
            placeholder="Search by ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            style={{ padding: '10px', width: '250px' }}
          />
        </div>

        {/* Add Worker Form */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="number"
            placeholder="Numeric ID"
            value={newWorker.identity}
            onChange={(e) => setNewWorker({ ...newWorker, identity: e.target.value })}
            style={{ padding: '10px', width: '150px' }}
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

        {/* Table of existing workers */}
        <div className="table-container">
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