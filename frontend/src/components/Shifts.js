import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/reset.css';
import './css/layout.css';
import './css/components.css';
import './css/themes.css';
import './css/responsive.css';

const ShiftsPage = ({ onLogout, userRole }) => {
<<<<<<< HEAD
=======
  // Mock workers data (using numeric identity values)
>>>>>>> main
  const workers = [
    { id: 1, identity: '207705096', name: 'Worker 1', phone: '050-123-4567', location: 'Tel Aviv', joiningDate: '01-01-2023', workerType: 'Driver' },
    { id: 2, identity: '205548491', name: 'Worker 2', phone: '052-987-6543', location: 'Jerusalem', joiningDate: '15-03-2023', workerType: 'Cleaner' },
    { id: 3, identity: '204987654', name: 'Worker 3', phone: '054-555-1212', location: 'Haifa', joiningDate: '10-06-2023', workerType: 'Maintenance Worker' },
  ];

<<<<<<< HEAD
=======
  // Mock shifts data (using numeric identity as workerId)
>>>>>>> main
  const initialShifts = [
    { id: 1, workerId: '207705096', workerName: 'Worker 1', workerType: 'Driver', date: '2025-03-06', startTime: '08:00', endTime: '16:00', location: 'Tel Aviv' },
    { id: 2, workerId: '205548491', workerName: 'Worker 2', workerType: 'Cleaner', date: '2025-03-06', startTime: '09:00', endTime: '17:00', location: 'Jerusalem' },
    { id: 3, workerId: '204987654', workerName: 'Worker 3', workerType: 'Maintenance Worker', date: '2025-03-07', startTime: '07:00', endTime: '15:00', location: 'Haifa' },
  ];

  const [shifts, setShifts] = useState(initialShifts);
  const [searchId, setSearchId] = useState(''); // Search by Worker ID (numeric identity)
  const [newShift, setNewShift] = useState({
    workerId: '',
    workerType: 'Driver', // Default worker type
    date: '',
    startTime: '',
    endTime: '',
    location: '',
  });
  const [updateWorkerId, setUpdateWorkerId] = useState(''); // Worker ID (numeric identity) for update
  const [updatedShift, setUpdatedShift] = useState({
    date: '',
    startTime: '',
    endTime: '',
    location: '',
  });

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

<<<<<<< HEAD
=======
  // Filter shifts by worker ID (numeric identity)
>>>>>>> main
  const filteredShifts = shifts.filter((shift) =>
    shift.workerId.toString().includes(searchId)
  );

  const handleAddShift = () => {
<<<<<<< HEAD
    if (newShift.workerId && newShift.date && newShift.startTime && newShift.endTime && newShift.location) {
      const selectedWorker = workers.find((w) => w.id === parseInt(newShift.workerId));
      const newId = shifts.length + 1;
      setShifts([...shifts, { id: newId, workerId: selectedWorker.id, workerName: selectedWorker.name, workerType: selectedWorker.workerType, ...newShift }]);
      setNewShift({ workerId: workers[0]?.id || '', date: '', startTime: '', endTime: '', location: '' });
=======
    if (
      newShift.workerId &&
      newShift.workerType &&
      newShift.date &&
      newShift.startTime &&
      newShift.endTime &&
      newShift.location
    ) {
      // Validate that the workerId is numeric
      if (!/^\d+$/.test(newShift.workerId)) {
        alert('Worker ID must be a numeric value.');
        return;
      }

      // Find the worker by identity (Worker ID)
      const selectedWorker = workers.find((w) => w.identity === newShift.workerId);
      if (!selectedWorker) {
        alert('Invalid Worker ID. Please enter a valid numeric ID from the Workers page.');
        return;
      }

      // Validate that the selected Worker Type matches the worker's type
      if (selectedWorker.workerType !== newShift.workerType) {
        alert(`Worker with ID ${newShift.workerId} is a ${selectedWorker.workerType}, not a ${newShift.workerType}. Please select the correct Worker Type.`);
        return;
      }

      // If validation passes, add the shift
      const newId = shifts.length + 1;
      setShifts([
        ...shifts,
        {
          id: newId,
          workerId: selectedWorker.identity, // Use numeric identity as workerId
          workerName: selectedWorker.name,
          workerType: selectedWorker.workerType,
          date: newShift.date,
          startTime: newShift.startTime,
          endTime: newShift.endTime,
          location: newShift.location,
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
>>>>>>> main
    } else {
      alert('Please fill in all fields to add a shift.');
    }
  };

  const handleDeleteShift = (id) => {
    setShifts(shifts.filter((shift) => shift.id !== id));
  };

  // Handle updating a shift
  const handleUpdateShift = () => {
    // Validate that the updateWorkerId is numeric
    if (!/^\d+$/.test(updateWorkerId)) {
      alert('Worker ID must be a numeric value.');
      return;
    }

    const shiftToUpdate = shifts.find((shift) => shift.workerId === updateWorkerId);
    if (shiftToUpdate) {
      setUpdatedShift({
        date: shiftToUpdate.date,
        startTime: shiftToUpdate.startTime,
        endTime: shiftToUpdate.endTime,
        location: shiftToUpdate.location,
      });
    } else {
      setUpdatedShift({ date: '', startTime: '', endTime: '', location: '' });
      alert('Worker ID not found in shifts.');
    }
  };

  // Handle saving updated shift
  const handleSaveUpdate = () => {
    // Validate that the updateWorkerId is numeric
    if (!/^\d+$/.test(updateWorkerId)) {
      alert('Worker ID must be a numeric value.');
      return;
    }

    const shiftToUpdate = shifts.find((shift) => shift.workerId === updateWorkerId);
    if (shiftToUpdate && updatedShift.date && updatedShift.startTime && updatedShift.endTime && updatedShift.location) {
      setShifts(
        shifts.map((shift) =>
          shift.workerId === updateWorkerId
            ? { ...shift, ...updatedShift }
            : shift
        )
      );
      setUpdateWorkerId('');
      setUpdatedShift({ date: '', startTime: '', endTime: '', location: '' });
    } else {
      alert('Please fill in all update fields with a valid Worker ID.');
    }
  };

  // Restrict access to managers only
  if (userRole !== 'manager') {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="shifts" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Shifts</h1>
<<<<<<< HEAD
        <div className="form-container">
          <input
            type="text"
            placeholder="Search by worker name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="form-container shift-form">
          <select
            value={newShift.workerId}
            onChange={(e) => setNewShift({ ...newShift, workerId: e.target.value })}
            className="form-input"
=======

        {/* Search Bar (Search by ID) */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="number"
            placeholder="Search by ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #e0e0e0', fontSize: '1rem' }}
          />
        </div>

        {/* Add Shift Bar (Separate and Continuous) */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="number"
            placeholder="Worker ID"
            value={newShift.workerId}
            onChange={(e) => setNewShift({ ...newShift, workerId: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          />
          <select
            value={newShift.workerType}
            onChange={(e) => setNewShift({ ...newShift, workerType: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
>>>>>>> main
          >
            <option value="Driver">Driver</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Maintenance Worker">Maintenance Worker</option>
          </select>
          <input
            type="date"
            value={newShift.date}
            onChange={(e) => setNewShift({ ...newShift, date: e.target.value })}
<<<<<<< HEAD
            className="form-input"
=======
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
>>>>>>> main
          />
          <input
            type="time"
            value={newShift.startTime}
            onChange={(e) => setNewShift({ ...newShift, startTime: e.target.value })}
<<<<<<< HEAD
            className="form-input"
=======
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
>>>>>>> main
          />
          <input
            type="time"
            value={newShift.endTime}
            onChange={(e) => setNewShift({ ...newShift, endTime: e.target.value })}
<<<<<<< HEAD
            className="form-input"
=======
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
>>>>>>> main
          />
          <input
            type="text"
            placeholder="Location"
            value={newShift.location}
            onChange={(e) => setNewShift({ ...newShift, location: e.target.value })}
<<<<<<< HEAD
            className="form-input"
          />
          <button onClick={handleAddShift} className="download-report-btn">
            Add Shift
          </button>
        </div>
=======
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          />
          <button
            onClick={handleAddShift}
            className="download-report-btn"
            style={{ padding: '10px 20px', height: '40px', width: '200px' }}
          >
            Add Shift
          </button>
        </div>

        {/* Update Shift Section (By Worker ID) */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="number"
            placeholder="Worker ID to Update"
            value={updateWorkerId}
            onChange={(e) => setUpdateWorkerId(e.target.value)}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
          />
          <button
            onClick={handleUpdateShift}
            className="download-report-btn"
            style={{ padding: '10px 20px', height: '40px', marginRight: '10px' }}
          >
            Load Update
          </button>
          {updateWorkerId && (
            <>
              <input
                type="date"
                value={updatedShift.date}
                onChange={(e) => setUpdatedShift({ ...updatedShift, date: e.target.value })}
                style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
              />
              <input
                type="time"
                value={updatedShift.startTime}
                onChange={(e) => setUpdatedShift({ ...updatedShift, startTime: e.target.value })}
                style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
              />
              <input
                type="time"
                value={updatedShift.endTime}
                onChange={(e) => setUpdatedShift({ ...updatedShift, endTime: e.target.value })}
                style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
              />
              <input
                type="text"
                placeholder="Location"
                value={updatedShift.location}
                onChange={(e) => setUpdatedShift({ ...updatedShift, location: e.target.value })}
                style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', flex: '1' }}
              />
              <button
                onClick={handleSaveUpdate}
                className="download-report-btn"
                style={{ padding: '10px 20px', height: '40px', width: '200px' }}
              >
                Save Update
              </button>
            </>
          )}
        </div>

        {/* Shifts Table */}
>>>>>>> main
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Worker Name</th>
                <th>Worker Type</th>
                <th>Phone</th> {/* New column for phone number */}
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
<<<<<<< HEAD
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
                    <button onClick={() => handleDeleteShift(shift.id)} className="action-btn delete">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
=======
              {filteredShifts.map((shift) => {
                const worker = workers.find((w) => w.identity === shift.workerId);
                return (
                  <tr key={shift.id}>
                    <td>{shift.workerId}</td> {/* Display workerId (numeric identity) */}
                    <td>{shift.workerName}</td>
                    <td>{shift.workerType}</td>
                    <td>{worker ? worker.phone : ''}</td> {/* Display phone number */}
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
                );
              })}
>>>>>>> main
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShiftsPage;