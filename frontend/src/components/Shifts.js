import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './css/general.css';

const ShiftsPage = ({ onLogout, userRole }) => {
  const [shifts, setShifts] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loadingWorkers, setLoadingWorkers] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [newShift, setNewShift] = useState({
    workerId: '',
    workerType: 'Driver',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
  });
  const [updateShift, setUpdateShift] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch workers for validation
  const fetchWorkers = async () => {
    try {
      setLoadingWorkers(true);
      const response = await axios.get("http://localhost:5000/workers/");
      console.log("FETCHED WORKERS RESPONSE:", response.data);
      if (Array.isArray(response.data)) {
        setWorkers(response.data);
        console.log("WORKERS SET:", response.data);
      } else {
        console.error("Workers data is not an array:", response.data);
      }
    } catch (err) {
      console.error("Error fetching workers:", err);
    } finally {
      setLoadingWorkers(false);
    }
  };

  // Fetch shifts
  const fetchShifts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/shifts/");
      console.log("FETCHED SHIFTS RESPONSE:", response.data);
      setShifts(response.data);
    } catch (err) {
      console.error("Error fetching shifts:", err);
    }
  };

  useEffect(() => {
    fetchWorkers();
    fetchShifts();
  }, []);

  // Update workerType when workerId changes, but don't alert yet
  const handleWorkerIdChange = (e) => {
    const id = e.target.value;
    setNewShift({ ...newShift, workerId: id });
    console.log("ENTERED WORKER ID:", id);
    console.log("AVAILABLE WORKERS:", workers);
    if (id && !loadingWorkers) {
      const worker = workers.find((w) => w.identity === id || w.identity.toString() === id);
      console.log("FOUND WORKER:", worker);
      if (worker) {
        // Check if the worker is a manager
        if (worker.role === 'manager') {
          setNewShift((prev) => ({ ...prev, workerType: 'Invalid Worker ID' }));
        } else {
          setNewShift((prev) => ({ ...prev, workerType: worker.workerType || 'Driver' }));
        }
      } else {
        setNewShift((prev) => ({ ...prev, workerType: 'Invalid Worker ID' }));
      }
    } else {
      setNewShift((prev) => ({ ...prev, workerType: 'Driver' }));
    }
  };

  // Validate workerId on blur (when the user finishes typing)
  const handleWorkerIdBlur = () => {
    const id = newShift.workerId;
    if (id && !loadingWorkers) {
      const worker = workers.find((w) => w.identity === id || w.identity.toString() === id);
      if (!worker) {
        alert('Worker ID not found. Please enter a valid ID from the Workers page.');
      } else if (worker.role === 'manager') {
        alert('Managers cannot be assigned shifts.');
      }
    }
  };

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  // Filter shifts by workerId, workerName, location, or date
  const filteredShifts = shifts.filter((shift) => {
    const searchLower = searchTerm.toLowerCase();
    const idMatch = shift.workerId.toLowerCase().includes(searchLower);
    const nameMatch = shift.workerName.toLowerCase().includes(searchLower);
    const locationMatch = shift.location.toLowerCase().includes(searchLower);
    const dateMatch = shift.date.toLowerCase().includes(searchLower);
    return idMatch || nameMatch || locationMatch || dateMatch;
  });

  const handleAddShift = async () => {
    if (loadingWorkers || !newShift.workerId || !newShift.workerType || newShift.workerType === 'Invalid Worker ID' || !newShift.date || !newShift.startTime || !newShift.endTime || !newShift.location) {
      alert('Please wait for workers to load or fill in all fields with a valid Worker ID.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/shifts/', {
        workerId: newShift.workerId,
        workerType: newShift.workerType,
        date: newShift.date,
        startTime: newShift.startTime,
        endTime: newShift.endTime,
        location: newShift.location,
      });
      alert(response.data.message || 'Shift added successfully!');
      fetchShifts();
      setNewShift({
        workerId: '',
        workerType: 'Driver',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
      });
    } catch (error) {
      alert(error.response?.data?.error || 'Error adding shift');
      console.error("Error adding shift:", error.response?.data || error.message);
    }
  };

  const handleDeleteShift = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/shifts/${id}`);
      fetchShifts();
    } catch (error) {
      console.error("Error deleting shift:", error.response?.data || error.message);
      alert('Failed to delete shift');
    }
  };

  const handleUpdateShift = (shift) => {
    setUpdateShift(shift);
    setModalVisible(true);
  };

  const handleSaveUpdate = async () => {
    if (!updateShift.date || !updateShift.startTime || !updateShift.endTime || !updateShift.location) {
      alert('Please fill in all update fields.');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:5000/shifts/${updateShift.id}`, {
        workerId: updateShift.workerId,
        date: updateShift.date,
        startTime: updateShift.startTime,
        endTime: updateShift.endTime,
        location: updateShift.location,
      });
      alert(response.data.message || 'Shift updated successfully!');
      fetchShifts();
      setModalVisible(false);
      setUpdateShift(null);
    } catch (error) {
      alert(error.response?.data?.error || 'Error updating shift');
      console.error("Error updating shift:", error.response?.data || error.message);
    }
  };

  if (userRole !== 'manager') {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="shifts" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Shifts</h1>

        {/* Search Bar for Table Filtering */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search by ID, name, location, or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #e0e0e0', fontSize: '1rem' }}
          />
        </div>

        {/* Add Shift Form */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="number"
            placeholder="Worker ID"
            value={newShift.workerId}
            onChange={handleWorkerIdChange}
            onBlur={handleWorkerIdBlur}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          />
          <select
            value={newShift.workerType}
            onChange={(e) => setNewShift({ ...newShift, workerType: e.target.value })}
            disabled={newShift.workerType === 'Invalid Worker ID'}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          >
            <option value="Driver">Driver</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Maintenance Worker">Maintenance Worker</option>
            <option value="Invalid Worker ID" disabled>Invalid Worker ID</option>
          </select>
          <input
            type="date"
            value={newShift.date}
            onChange={(e) => setNewShift({ ...newShift, date: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          />
          <input
            type="time"
            value={newShift.startTime}
            onChange={(e) => setNewShift({ ...newShift, startTime: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          />
          <input
            type="time"
            value={newShift.endTime}
            onChange={(e) => setNewShift({ ...newShift, endTime: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          />
          <input
            type="text"
            placeholder="Location"
            value={newShift.location}
            onChange={(e) => setNewShift({ ...newShift, location: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          />
          <button
            onClick={handleAddShift}
            className="download-report-btn"
            style={{ padding: '10px 20px', height: '40px', width: '200px' }}
            disabled={loadingWorkers}
          >
            Add Shift
          </button>
        </div>

        {/* Shifts Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Worker Name</th>
                <th>Worker Type</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredShifts.length > 0 ? (
                filteredShifts.map((shift) => (
                  <tr key={shift.id}>
                    <td>{shift.workerId}</td>
                    <td>{shift.workerName}</td>
                    <td>{shift.workerType}</td>
                    <td>{shift.phone || 'N/A'}</td>
                    <td>{shift.date}</td>
                    <td>{shift.startTime}</td>
                    <td>{shift.endTime}</td>
                    <td>{shift.location}</td>
                    <td>
                      <button
                        onClick={() => handleUpdateShift(shift)}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#3498db',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          marginRight: '5px',
                        }}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteShift(shift.id)}
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
                  <td colSpan="9">No shifts found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal for updating shift */}
        {modalVisible && updateShift && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
              <h3>Update Shift for {updateShift.workerName}</h3>
              <input
                type="date"
                value={updateShift.date}
                onChange={(e) => setUpdateShift({ ...updateShift, date: e.target.value })}
                style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #e0e0e0', width: '100%' }}
              />
              <input
                type="time"
                value={updateShift.startTime}
                onChange={(e) => setUpdateShift({ ...updateShift, startTime: e.target.value })}
                style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #e0e0e0', width: '100%' }}
              />
              <input
                type="time"
                value={updateShift.endTime}
                onChange={(e) => setUpdateShift({ ...updateShift, endTime: e.target.value })}
                style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #e0e0e0', width: '100%' }}
              />
              <input
                type="text"
                placeholder="Location"
                value={updateShift.location}
                onChange={(e) => setUpdateShift({ ...updateShift, location: e.target.value })}
                style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #e0e0e0', width: '100%' }}
              />
              <div style={{ marginTop: '20px' }}>
                <button
                  onClick={handleSaveUpdate}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => setModalVisible(false)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#ff4d4f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShiftsPage;