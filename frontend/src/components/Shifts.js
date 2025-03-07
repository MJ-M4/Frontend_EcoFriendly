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
        workerId: workers[0]?.id || '',
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
      </div>
    </div>
  );
};

export default ShiftsPage;