// src/components/SecureAccessCodeGenerator.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/general.css';

const SecureAccessCodeGenerator = ({ onLogout, userRole }) => {
  // Mock workers data
  const initialWorkers = [
    { id: 1, identity: 'ID001', name: 'Worker 1', phone: '050-123-4567', location: 'Tel Aviv', joiningDate: '01-01-2023', workerType: 'Driver', accessCode: '' },
    { id: 2, identity: 'ID002', name: 'Worker 2', phone: '052-987-6543', location: 'Jerusalem', joiningDate: '15-03-2023', workerType: 'Cleaner', accessCode: '' },
    { id: 3, identity: 'ID003', name: 'Worker 3', phone: '054-555-1212', location: 'Haifa', joiningDate: '10-06-2023', workerType: 'Maintenance Worker', accessCode: '' },
  ];

  const [workers, setWorkers] = useState(initialWorkers);
  const [selectedWorkerId, setSelectedWorkerId] = useState(workers[0]?.id || '');
  const [newWorkerId, setNewWorkerId] = useState('20075981'); // Example ID for new worker
  const [generatedNewWorkerCode, setGeneratedNewWorkerCode] = useState('');
  const [message, setMessage] = useState('');

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  // Handle generating a secure access code for an existing worker
  const handleGenerateCode = () => {
    if (!selectedWorkerId) {
      setMessage('Error: Please select a worker.');
      return;
    }

    // Generate a random 6-character alphanumeric code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setWorkers(
      workers.map((worker) =>
        worker.id === parseInt(selectedWorkerId)
          ? { ...worker, accessCode: code }
          : worker
      )
    );
    setMessage(`Secure Access Code for Worker ${selectedWorkerId}: ${code}`);
  };

  // Handle generating a password for a new worker based on their ID
  const handleGenerateNewWorkerCode = () => {
    if (!newWorkerId) {
      setMessage('Error: Please enter a new worker ID.');
      return;
    }

    // Generate a password based on the worker ID
    const base = newWorkerId.slice(-4); // Take last 4 digits of ID
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase(); // Random 4 characters
    const specialChar = '!@#$%^&*'[Math.floor(Math.random() * 8)]; // Random special character
    const newCode = `${base}-${randomPart}${specialChar}`; // Example format: 5981-ABCD!

    setGeneratedNewWorkerCode(newCode);
    setMessage(`Generated Password for New Worker (ID: ${newWorkerId}): ${newCode}`);
  };

  // Restrict access to managers only
  if (userRole !== 'manager') {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="secure-access-code" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Secure Access Code Generator</h1>

        {/* Section 1: Generate Code for Existing Workers */}
        <div className="form-container" style={{ marginBottom: '30px' }}>
          <h3>Generate Code for Existing Worker</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontSize: '1rem' }}>
              Select Worker:
              <select
                value={selectedWorkerId}
                onChange={(e) => setSelectedWorkerId(e.target.value)}
                className="form-input"
                style={{ marginLeft: '10px', padding: '8px', borderRadius: '5px' }}
              >
                {workers.map((worker) => (
                  <option key={worker.id} value={worker.id}>
                    {worker.name} ({worker.workerType})
                  </option>
                ))}
              </select>
            </label>
            <button
              onClick={handleGenerateCode}
              className="download-report-btn"
              style={{ padding: '8px 20px', height: '40px' }}
            >
              Generate Code
            </button>
          </div>
        </div>

        {/* Section 2: Workers Table with Access Codes */}
        <div className="table-container" style={{ marginBottom: '30px' }}>
          <table>
            <thead>
              <tr>
                <th>Worker ID</th>
                <th>Name</th>
                <th>Worker Type</th>
                <th>Location</th>
                <th>Access Code</th>
              </tr>
            </thead>
            <tbody>
              {workers.map((worker) => (
                <tr key={worker.id}>
                  <td>{worker.identity}</td>
                  <td>{worker.name}</td>
                  <td>{worker.workerType}</td>
                  <td>{worker.location}</td>
                  <td>{worker.accessCode || 'Not Generated'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 3: Generate Password for New Worker */}
        <div className="form-container" style={{ marginBottom: '30px' }}>
          <h3>Generate Password for New Worker</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontSize: '1rem' }}>
              New Worker ID:
              <input
                type="text"
                value={newWorkerId}
                onChange={(e) => setNewWorkerId(e.target.value)}
                className="form-input"
                style={{ marginLeft: '10px', padding: '8px', borderRadius: '5px' }}
                placeholder="Enter Worker ID (e.g., 20075981)"
              />
            </label>
            <button
              onClick={handleGenerateNewWorkerCode}
              className="download-report-btn"
              style={{ padding: '8px 20px', height: '40px' }}
            >
              Generate Password
            </button>
          </div>
          {generatedNewWorkerCode && (
            <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#4caf50' }}>
              Generated Password: {generatedNewWorkerCode}
            </p>
          )}
        </div>

        {/* Section 4: Password Examples */}
        <div style={{ marginBottom: '30px' }}>
          <h3>Password Examples for New Workers</h3>
          <p>Here are some example passwords generated based on Worker IDs:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>ID: 20075981 → Password: 5981-KL2N!</li>
            <li>ID: 12345678 → Password: 5678-PQ5R@</li>
            <li>ID: 98765432 → Password: 5432-XY7Z#</li>
          </ul>
          <p>
            Format: Last 4 digits of ID - Random 4 characters + Special character (e.g., !@#$%^&*)
          </p>
        </div>

        {/* Feedback Message */}
        {message && (
          <p
            style={{
              marginTop: '20px',
              color: message.startsWith('Error') ? '#e74c3c' : '#4caf50',
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SecureAccessCodeGenerator;