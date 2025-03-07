import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/reset.css';
import './css/layout.css';
import './css/components.css';
import './css/themes.css';
import './css/responsive.css';

const WorkersPage = ({ onLogout, userRole }) => {
  const initialWorkers = [
    { id: 1, identity: 'ID001', name: 'Worker 1', phone: '050-123-4567', location: 'Tel Aviv', joiningDate: '01-01-2023', workerType: 'Driver' },
    { id: 2, identity: 'ID002', name: 'Worker 2', phone: '052-987-6543', location: 'Jerusalem', joiningDate: '15-03-2023', workerType: 'Cleaner' },
    { id: 3, identity: 'ID003', name: 'Worker 3', phone: '054-555-1212', location: 'Haifa', joiningDate: '10-06-2023', workerType: 'Maintenance Worker' },
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
    workerType: 'Driver',
  });

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  const filteredWorkers = workers.filter((worker) => {
    const matchesRegion = worker.location.toLowerCase().includes(searchRegion.toLowerCase());
    const matchesId = worker.identity.toLowerCase().includes(searchId.toLowerCase());
    return matchesRegion && matchesId;
  });

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
        <div className="form-container">
          <input
            type="text"
            placeholder="Search by region..."
            value={searchRegion}
            onChange={(e) => setSearchRegion(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Search by ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
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
          <button onClick={handleAddWorker} className="download-report-btn">
            Add Worker
          </button>
        </div>
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