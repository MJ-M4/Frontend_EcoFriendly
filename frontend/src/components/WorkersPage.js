import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
  const [searchTerm, setSearchTerm] = useState(''); // Single search term for region, ID, or other fields
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
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [selectedPassword, setSelectedPassword] = useState(''); // State for the password to display in modal

  const fetchWorkers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/workers/");
      console.log("FETCHED WORKERS RESPONSE:", response.data); // Debug log
      setWorkers(response.data);
    } catch (err) {
      console.error("Error fetching workers:", err);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const user = { name: 'ManagerUser', avatar: '/images/sami.png' };

  // Filter workers by region, ID, or other fields
  const filteredWorkers = workers.filter((worker) => {
    const searchLower = searchTerm.toLowerCase();
    const regionMatch = worker.location?.toLowerCase().includes(searchLower) || false;
    const idMatch = String(worker.identity).toLowerCase().includes(searchLower) || false;
    const nameMatch = worker.name?.toLowerCase().includes(searchLower) || false; // Optional: search by name
    const phoneMatch = worker.phone?.toLowerCase().includes(searchLower) || false; // Optional: search by phone
    const dateMatch = worker.joiningDate?.toLowerCase().includes(searchLower) || false; // Optional: search by date
    console.log(`Filtering: searchTerm=${searchTerm}, worker=${JSON.stringify(worker)}, matches=${regionMatch || idMatch || nameMatch || phoneMatch || dateMatch}`);
    return regionMatch || idMatch || nameMatch || phoneMatch || dateMatch; // Show if any field matches
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
        name: name,
        phone,
        location,
        joiningDate,
        password: accessCode,
        role: role,
        worker_type: role === 'worker' ? workerType : null
      });
      alert(response.data.message || 'User registered!');
      fetchWorkers(); // Refresh the worker list
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
      console.error("Error creating user:", error.response?.data || error.message);
    }
  };

  const handleDeleteWorker = async (workerId) => {
    try {
      console.log(`Attempting to delete worker with id: ${workerId}`);
      await axios.delete(`http://localhost:5000/workers/${workerId}`);
      console.log(`Deleted worker with id: ${workerId}`);
      fetchWorkers();
    } catch (error) {
      console.error("Error deleting worker:", error.response ? error.response.data : error.message);
      alert('Failed to delete user');
    }
  };

  const showPassword = (password) => {
    setSelectedPassword(password);
    setModalVisible(true);
  };

  const hidePassword = () => {
    setModalVisible(false);
    setSelectedPassword('');
  };

  if (userRole !== 'manager') {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="workers" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Workers</h1>

        {/* Single Search Bar */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search by region or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '10px', width: '250px', borderRadius: '5px', border: '1px solid #e0e0e0', fontSize: '1rem' }}
          />
        </div>

        {/* Add Worker Form */}
        <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          <input
            type="number"
            placeholder="Numeric ID"
            value={newWorker.identity}
            onChange={(e) => setNewWorker({ ...newWorker, identity: e.target.value })}
            style={{ padding: '10px', width: '150px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          />
          <input
            type="text"
            placeholder="Name"
            value={newWorker.name}
            onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
            style={{ padding: '10px', width: '150px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={newWorker.phone}
            onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })}
            style={{ padding: '10px', width: '150px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          />
          <input
            type="text"
            placeholder="Location"
            value={newWorker.location}
            onChange={(e) => setNewWorker({ ...newWorker, location: e.target.value })}
            style={{ padding: '10px', width: '150px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          />
          <input
            type="date"
            value={newWorker.joiningDate}
            onChange={(e) => setNewWorker({ ...newWorker, joiningDate: e.target.value })}
            style={{ padding: '10px', width: '150px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          />
          <select
            value={newWorker.role}
            onChange={(e) => setNewWorker({ ...newWorker, role: e.target.value })}
            style={{ padding: '10px', width: '120px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          >
            <option value="worker">Worker</option>
            <option value="manager">Manager</option>
          </select>
          <select
            value={newWorker.workerType}
            onChange={(e) => setNewWorker({ ...newWorker, workerType: e.target.value })}
            disabled={newWorker.role !== 'worker'}
            style={{ padding: '10px', width: '150px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
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
            style={{ padding: '10px', width: '200px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1', maxWidth: '300px', backgroundColor: '#f0f0e0' }}
          />
          <button
            className="action-button"
            onClick={handleGenerateAccessCode}
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
          <button
            className="action-button"
            onClick={handleAddWorker}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              height: '40px',
              width: '200px',
              margin: '5px',
            }}
          >
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
              {filteredWorkers.length > 0 ? (
                filteredWorkers.map((worker) => (
                  <tr key={worker.id}>
                    <td>{worker.id || 'N/A'}</td>
                    <td>{worker.identity || 'N/A'}</td>
                    <td>{worker.name || 'N/A'}</td>
                    <td>{worker.phone || 'N/A'}</td>
                    <td>{worker.location || 'N/A'}</td>
                    <td>{worker.joiningDate || 'N/A'}</td>
                    <td>{worker.role || 'N/A'}</td>
                    <td>{worker.role === 'manager' ? 'N/A' : worker.workerType || 'N/A'}</td>
                    <td>
                      ######
                      <button
                        onClick={() => showPassword(worker.hashedPassword || 'N/A')}
                        style={{
                          padding: '2px 8px',
                          marginLeft: '10px',
                          backgroundColor: '#2ecc71',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                        }}
                      >
                        Show
                      </button>
                    </td>
                    <td>
                      <button
                        className="delete-button"
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
                ))
              ) : (
                <tr>
                  <td colSpan="10">No workers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal for displaying hashed password */}
        {modalVisible && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                width: '400px',
                maxWidth: '90%',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                textAlign: 'center',
              }}
            >
              <h3>Hashed Password</h3>
              <p style={{ wordBreak: 'break-all', margin: '10px 0' }}>{selectedPassword}</p>
              <button
                onClick={hidePassword}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#ff4d4f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkersPage;