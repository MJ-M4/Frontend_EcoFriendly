// src/components/WorkersPage.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/general.css';

const WorkersPage = ({ onLogout, userRole }) => {
  // Mock workers data with workerType
  const initialWorkers = [
    { id: 1, identity: 'ID001', name: 'Worker 1', phone: '050-123-4567', location: 'Tel Aviv', joiningDate: '01-01-2023', workerType: 'Driver' },
    { id: 2, identity: 'ID002', name: 'Worker 2', phone: '052-987-6543', location: 'Jerusalem', joiningDate: '15-03-2023', workerType: 'Cleaner' },
    { id: 3, identity: 'ID003', name: 'Worker 3', phone: '054-555-1212', location: 'Haifa', joiningDate: '10-06-2023', workerType: 'Maintenance Worker' },
  ];

  const [workers, setWorkers] = useState(initialWorkers);
  const [searchRegionOrID, setSearchRegion] = useState(''); // Search by region
  const [newWorker, setNewWorker] = useState({
    identity: '',
    name: '',
    phone: '',
    location: '',
    joiningDate: '',
    workerType: 'Driver', // Default worker type
  });
  // New state for generated password
  const [generatedPassword, setGeneratedPassword] = useState('');

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  // Filter workers by location and/or ID
  const filteredWorkers = workers.filter((worker) =>
    worker.location.toLowerCase().includes(searchRegionOrID.toLowerCase()) ||
    worker.identity.toLowerCase().includes(searchRegionOrID.toLowerCase())
  );

  // Generate a random password
  const generateRandomPassword = () => {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return newPassword;
  };

  // Handle generating a password
  const handleGeneratePassword = () => {
    const newPassword = generateRandomPassword();
    setGeneratedPassword(newPassword);
  };

  // Handle adding a new worker
  const handleAddWorker = async () => {
    if (
      newWorker.identity &&
      newWorker.name &&
      newWorker.phone &&
      newWorker.location &&
      newWorker.joiningDate &&
      newWorker.workerType
    ) {
      let hashedPassword = null;
      if (generatedPassword) {
        try {
          // Convert password to ArrayBuffer
          const encoder = new TextEncoder();
          const data = encoder.encode(generatedPassword);
          // Generate SHA-256 hash
          const hash = await crypto.subtle.digest('SHA-256', data);
          // Convert hash to hexadecimal string
          const hashArray = Array.from(new Uint8Array(hash));
          hashedPassword = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        } catch (error) {
          alert('Error hashing password: ' + error.message);
          return;
        }
      }

      const newId = workers.length + 1;
      setWorkers([...workers, { id: newId, ...newWorker, hashedPassword }]);
      setNewWorker({ identity: '', name: '', phone: '', location: '', joiningDate: '', workerType: 'Driver' });
      setGeneratedPassword(''); // Reset the generated password
    } else {
      alert('Please fill in all fields to add a worker.');
    }
  };

  // Handle deleting a worker
  const handleDeleteWorker = (id) => {
    setWorkers(workers.filter((worker) => worker.id !== id));
  };

  // Restrict access to managers only
  if (userRole !== 'manager') {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="workers" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Workers</h1>

        {/* Search Boxes */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
          <input
            type="text"
            placeholder="Search by region or id..."
            value={searchRegionOrID}
            onChange={(e) => setSearchRegion(e.target.value)}
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
        <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Identity"
            value={newWorker.identity}
            onChange={(e) => setNewWorker({ ...newWorker, identity: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          />
          <input
            type="text"
            placeholder="Name"
            value={newWorker.name}
            onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={newWorker.phone}
            onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          />
          <input
            type="text"
            placeholder="Location"
            value={newWorker.location}
            onChange={(e) => setNewWorker({ ...newWorker, location: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          />
          <input
            type="date"
            value={newWorker.joiningDate}
            onChange={(e) => setNewWorker({ ...newWorker, joiningDate: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          />
          <select
            value={newWorker.workerType}
            onChange={(e) => setNewWorker({ ...newWorker, workerType: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          >
            <option value="Driver">Driver</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Maintenance Worker">Maintenance Worker</option>
          </select>
          {/* Password Generation Section */}
          <button
            onClick={handleGeneratePassword}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              height: '40px',
              margin: '5px',
            }}
          >
            Generate Password
          </button>
          {generatedPassword && (
            <input
              type="text"
              value={generatedPassword}
              readOnly
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1', maxWidth: '300px', backgroundColor: '#f0f0f0' }}
            />
          )}
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