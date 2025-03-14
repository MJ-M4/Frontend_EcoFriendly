// src/components/Shifts.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/general.css';

const ShiftsPage = ({ onLogout, userRole }) => {
  // Mock workers data (ideally passed as props or fetched from a shared state)
  const workers = [
    { id: 1, identity: 'ID001', name: 'Worker 1', phone: '050-123-4567', location: 'Tel Aviv', joiningDate: '01-01-2023', workerType: 'Driver' },
    { id: 2, identity: 'ID002', name: 'Worker 2', phone: '052-987-6543', location: 'Jerusalem', joiningDate: '15-03-2023', workerType: 'Cleaner' },
    { id: 3, identity: 'ID003', name: 'Worker 3', phone: '054-555-1212', location: 'Haifa', joiningDate: '10-06-2023', workerType: 'Maintenance Worker' },
  ];

  // Mock shifts data
  const initialShifts = [
    { id: 1, workerId: 1, workerName: 'Worker 1', workerType: 'Driver', date: '2025-03-06', startTime: '08:00', endTime: '16:00', location: 'Tel Aviv' },
    { id: 2, workerId: 2, workerName: 'Worker 2', workerType: 'Cleaner', date: '2025-03-06', startTime: '09:00', endTime: '17:00', location: 'Jerusalem' },
    { id: 3, workerId: 3, workerName: 'Worker 3', workerType: 'Maintenance Worker', date: '2025-03-07', startTime: '07:00', endTime: '15:00', location: 'Haifa' },
  ];

  const [shifts, setShifts] = useState(initialShifts);
  const [searchTerm, setSearchTerm] = useState('');
  const [newShift, setNewShift] = useState({
    workerId: workers[0]?.id || '',
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
        setWorkers([]);
      }
    } catch (err) {
      console.error("Error fetching workers:", err);
      setWorkers([]);
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

  // Normalize workerType to match dropdown options (e.g., "driver" -> "Driver")
  const normalizeWorkerType = (workerType) => {
    if (!workerType) return 'Driver'; // Default to "Driver" if undefined
    const lowerCaseType = workerType.toLowerCase();
    switch (lowerCaseType) {
      case 'driver':
        return 'Driver';
      case 'cleaner':
        return 'Cleaner';
      case 'maintenance worker':
        return 'Maintenance Worker';
      default:
        return 'Driver'; // Fallback to "Driver" if unknown
    }
  };

  // Update workerType when workerId changes
  const handleWorkerIdChange = (e) => {
    const id = e.target.value.trim(); // Remove any whitespace
    setNewShift((prev) => ({ ...prev, workerId: id }));
    console.log("ENTERED WORKER ID:", id);
    console.log("AVAILABLE WORKERS:", workers);

    if (id && !loadingWorkers && workers.length > 0) {
      const worker = workers.find((w) => {
        const workerId = w.identity ? w.identity.toString().trim() : null;
        return workerId === id;
      });
      console.log("FOUND WORKER:", worker);
      if (worker && worker.identity) {
        if (worker.role === 'manager') {
          console.log("Worker is a manager, setting workerType to 'Invalid Worker ID'");
          setNewShift((prev) => ({ ...prev, workerType: 'Invalid Worker ID' }));
        } else {
          const normalizedType = normalizeWorkerType(worker.workerType);
          console.log("Setting workerType to:", normalizedType);
          setNewShift((prev) => ({ ...prev, workerType: normalizedType }));
        }
      } else {
        console.log("Worker not found, setting workerType to 'Invalid Worker ID'");
        setNewShift((prev) => ({ ...prev, workerType: 'Invalid Worker ID' }));
      }
    } else {
      console.log("No ID entered or workers not loaded, resetting workerType to 'Driver'");
      setNewShift((prev) => ({ ...prev, workerType: 'Driver' }));
    }
  };

  // Validate workerId on blur
  const handleWorkerIdBlur = () => {
    const id = newShift.workerId.trim();
    if (id && !loadingWorkers && workers.length > 0) {
      const worker = workers.find((w) => {
        const workerId = w.identity ? w.identity.toString().trim() : null;
        return workerId === id;
      });
      if (!worker || !worker.identity) {
        alert('Worker ID not found. Please enter a valid ID from the Workers page.');
      } else if (worker.role === 'manager') {
        alert('Managers cannot be assigned shifts.');
      }
    }
  };

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  // Filter shifts by worker name
  const filteredShifts = shifts.filter((shift) =>
    shift.workerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding a new shift
  const handleAddShift = () => {
    if (
      newShift.workerId &&
      newShift.date &&
      newShift.startTime &&
      newShift.endTime &&
      newShift.location
    ) {
      const selectedWorker = workers.find((w) => w.id === parseInt(newShift.workerId));
      const newId = shifts.length + 1;
      setShifts([
        ...shifts,
        {
          id: newId,
          workerId: selectedWorker.id,
          workerName: selectedWorker.name,
          workerType: selectedWorker.workerType,
          ...newShift,
        },
      ]);
      setNewShift({
        workerId: '',
        workerType: 'Driver',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
      });
    } else {
      alert('Please fill in all fields to add a shift.');
    }
  };

  // Handle deleting a shift
  const handleDeleteShift = (id) => {
    setShifts(shifts.filter((shift) => shift.id !== id));
  };

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="shifts" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Shifts</h1>

        {/* Search Box */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by worker name..."
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

        {/* Add Shift Form */}
        <div style={{ marginBottom: '20px' }}>
          <select
            value={newShift.workerId}
            onChange={(e) => setNewShift({ ...newShift, workerId: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0' }}
          >
            {workers.map((worker) => (
              <option key={worker.id} value={worker.id}>
                {worker.name} ({worker.workerType})
              </option>
            ))}
          </select>
          <input
            type="date"
            value={newShift.date}
            onChange={(e) => setNewShift({ ...newShift, date: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0' }}
          />
          <input
            type="time"
            value={newShift.startTime}
            onChange={(e) => setNewShift({ ...newShift, startTime: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0' }}
          />
          <input
            type="time"
            value={newShift.endTime}
            onChange={(e) => setNewShift({ ...newShift, endTime: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0' }}
          />
          <input
            type="text"
            placeholder="Location"
            value={newShift.location}
            onChange={(e) => setNewShift({ ...newShift, location: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0' }}
          />
          <button
            onClick={handleAddShift}
            className="download-report-btn"
            style={{ padding: '10px 20px', height: '40px', width: '200px', margin: '5px' }}
          >
            Add Shift
          </button>
        </div>

        {/* Shifts Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Shift ID</th>
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
              {filteredShifts.map((shift) => (
                <tr key={shift.id}>
                  <td>{shift.id}</td>
                  <td>{shift.workerName}</td>
                  <td>{shift.workerType}</td>
                  <td>{shift.date}</td>
                  <td>{shift.startTime}</td>
                  <td>{shift.endTime}</td>
                  <td>{shift.location}</td>
                  <td>
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
              ))}
            </tbody>
          </table>
        </div>

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
              <h3>Update Shift for {updateShift.workerName || 'Unknown Worker'}</h3>
              <input
                type="date"
                value={updateShift.date || ''}
                onChange={(e) => setUpdateShift({ ...updateShift, date: e.target.value })}
                style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #e0e0e0', width: '100%' }}
              />
              <input
                type="time"
                value={updateShift.startTime || ''}
                onChange={(e) => setUpdateShift({ ...updateShift, startTime: e.target.value })}
                style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #e0e0e0', width: '100%' }}
              />
              <input
                type="time"
                value={updateShift.endTime || ''}
                onChange={(e) => setUpdateShift({ ...updateShift, endTime: e.target.value })}
                style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #e0e0e0', width: '100%' }}
              />
              <input
                type="text"
                placeholder="Location"
                value={updateShift.location || ''}
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
