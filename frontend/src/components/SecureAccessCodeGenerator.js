import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/reset.css';
import './css/layout.css';
import './css/components.css';
import './css/themes.css';
import './css/responsive.css';

const SecureAccessCodeGenerator = ({ onLogout, userRole }) => {
  const initialWorkers = [
    { id: 1, identity: 'ID001', name: 'Worker 1', phone: '050-123-4567', location: 'Tel Aviv', joiningDate: '01-01-2023', workerType: 'Driver', accessCode: '' },
    { id: 2, identity: 'ID002', name: 'Worker 2', phone: '052-987-6543', location: 'Jerusalem', joiningDate: '15-03-2023', workerType: 'Cleaner', accessCode: '' },
    { id: 3, identity: 'ID003', name: 'Worker 3', phone: '054-555-1212', location: 'Haifa', joiningDate: '10-06-2023', workerType: 'Maintenance Worker', accessCode: '' },
  ];

  const [workers, setWorkers] = useState(initialWorkers);
  const [selectedWorkerId, setSelectedWorkerId] = useState(workers[0]?.id || '');
  const [newWorkerId, setNewWorkerId] = useState('20075981');
  const [generatedNewWorkerCode, setGeneratedNewWorkerCode] = useState('');
  const [message, setMessage] = useState('');

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  const handleGenerateCode = () => {
    if (!selectedWorkerId) {
      setMessage('Error: Please select a worker.');
      return;
    }
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setWorkers(workers.map((worker) => worker.id === parseInt(selectedWorkerId) ? { ...worker, accessCode: code } : worker));
    setMessage(`Secure Access Code for Worker ${selectedWorkerId}: ${code}`);
  };

  const handleGenerateNewWorkerCode = () => {
    if (!newWorkerId) {
      setMessage('Error: Please enter a new worker ID.');
      return;
    }
    const base = newWorkerId.slice(-4);
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    const specialChar = '!@#$%^&*'[Math.floor(Math.random() * 8)];
    const newCode = `${base}-${randomPart}${specialChar}`;
    setGeneratedNewWorkerCode(newCode);
    setMessage(`Generated Password for New Worker (ID: ${newWorkerId}): ${newCode}`);
  };

  if (userRole !== 'manager') {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="secure-access-code" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Secure Access Code Generator</h1>
        <div className="form-container code-generator">
          <h3>Generate Code for Existing Worker</h3>
          <div className="form-group">
            <label>
              Select Worker:
              <select
                value={selectedWorkerId}
                onChange={(e) => setSelectedWorkerId(e.target.value)}
                className="form-input"
              >
                {workers.map((worker) => (
                  <option key={worker.id} value={worker.id}>
                    {worker.name} ({worker.workerType})
                  </option>
                ))}
              </select>
            </label>
            <button onClick={handleGenerateCode} className="download-report-btn">
              Generate Code
            </button>
          </div>
        </div>
        <div className="table-container">
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
        <div className="form-container new-worker-code">
          <h3>Generate Password for New Worker</h3>
          <div className="form-group">
            <label>
              New Worker ID:
              <input
                type="text"
                value={newWorkerId}
                onChange={(e) => setNewWorkerId(e.target.value)}
                className="form-input"
                placeholder="Enter Worker ID (e.g., 20075981)"
              />
            </label>
            <button onClick={handleGenerateNewWorkerCode} className="download-report-btn">
              Generate Password
            </button>
          </div>
          {generatedNewWorkerCode && (
            <p className="success-message">Generated Password: {generatedNewWorkerCode}</p>
          )}
        </div>
        <div className="password-examples">
          <h3>Password Examples for New Workers</h3>
          <p>Here are some example passwords generated based on Worker IDs:</p>
          <ul>
            <li>ID: 20075981 → Password: 5981-KL2N!</li>
            <li>ID: 12345678 → Password: 5678-PQ5R@</li>
            <li>ID: 98765432 → Password: 5432-XY7Z#</li>
          </ul>
          <p>Format: Last 4 digits of ID - Random 4 characters + Special character (e.g., !@#$%^&*)</p>
        </div>
        {message && (
          <p className={message.startsWith('Error') ? 'error-message' : 'success-message'}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default SecureAccessCodeGenerator;