import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/reset.css';
import './css/layout.css';
import './css/components.css';
import './css/themes.css';
import './css/responsive.css';

const ShiftsPage = ({ onLogout, userRole }) => {
  const workers = [
    { id: 1, identity: 'ID001', name: 'Worker 1', phone: '050-123-4567', location: 'Tel Aviv', joiningDate: '01-01-2023', workerType: 'Driver' },
    { id: 2, identity: 'ID002', name: 'Worker 2', phone: '052-987-6543', location: 'Jerusalem', joiningDate: '15-03-2023', workerType: 'Cleaner' },
    { id: 3, identity: 'ID003', name: 'Worker 3', phone: '054-555-1212', location: 'Haifa', joiningDate: '10-06-2023', workerType: 'Maintenance Worker' },
  ];

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

  const filteredShifts = shifts.filter((shift) =>
    shift.workerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddShift = () => {
    if (newShift.workerId && newShift.date && newShift.startTime && newShift.endTime && newShift.location) {
      const selectedWorker = workers.find((w) => w.id === parseInt(newShift.workerId));
      const newId = shifts.length + 1;
      setShifts([...shifts, { id: newId, workerId: selectedWorker.id, workerName: selectedWorker.name, workerType: selectedWorker.workerType, ...newShift }]);
      setNewShift({ workerId: workers[0]?.id || '', date: '', startTime: '', endTime: '', location: '' });
    } else {
      alert('Please fill in all fields to add a shift.');
    }
  };

  const handleDeleteShift = (id) => {
    setShifts(shifts.filter((shift) => shift.id !== id));
  };

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="shifts" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Shifts</h1>
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
            className="form-input"
          />
          <input
            type="time"
            value={newShift.startTime}
            onChange={(e) => setNewShift({ ...newShift, startTime: e.target.value })}
            className="form-input"
          />
          <input
            type="time"
            value={newShift.endTime}
            onChange={(e) => setNewShift({ ...newShift, endTime: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Location"
            value={newShift.location}
            onChange={(e) => setNewShift({ ...newShift, location: e.target.value })}
            className="form-input"
          />
          <button onClick={handleAddShift} className="download-report-btn">
            Add Shift
          </button>
        </div>
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
                    <button onClick={() => handleDeleteShift(shift.id)} className="action-btn delete">
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