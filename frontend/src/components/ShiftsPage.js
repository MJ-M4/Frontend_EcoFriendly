// src/components/ShiftsPage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './css/general.css';
import Sidebar from './Sidebar';

const ShiftsPage = ({ onLogout, userRole, userName }) => {
  const [shifts, setShifts] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [newShift, setNewShift] = useState({
    workerId: '',
    workerName: '',
    workerType: '',
    phone: '',
    location: '',
    date: '',
    startTime: '',
    endTime: '',
  });
  const [error, setError] = useState('');

  const fetchShifts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/shifts', {
        params: { status: 'approved' },
      });
      setShifts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch shifts');
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  const handleWorkerIdChange = async (e) => {
    const workerId = e.target.value;
    setNewShift({ ...newShift, workerId });

    if (workerId.length >= 9) {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${workerId}`);
        const user = response.data;
        if (user.role !== 'worker') {
          setError('Selected user is not a worker');
          setNewShift({ ...newShift, workerId, workerName: '', workerType: '', phone: '', location: '' });
          return;
        }
        setNewShift({
          ...newShift,
          workerId,
          workerName: user.name,
          workerType: user.worker_type || 'Driver',
          phone: user.phone || '',
          location: user.location || '',
        });
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Worker not found');
        setNewShift({ ...newShift, workerId, workerName: '', workerType: '', phone: '', location: '' });
      }
    } else {
      setNewShift({ ...newShift, workerId, workerName: '', workerType: '', phone: '', location: '' });
    }
  };

  const handleAddShift = async () => {
    if (
      newShift.workerId &&
      newShift.workerName &&
      newShift.workerType &&
      newShift.phone &&
      newShift.location &&
      newShift.date &&
      newShift.startTime &&
      newShift.endTime
    ) {
      try {
        const response = await axios.post('http://localhost:5000/api/shifts', {
          worker_id: newShift.workerId,
          date: newShift.date,
          start_time: newShift.startTime,
          end_time: newShift.endTime,
          location: newShift.location,
          status: 'approved',
        });
        setShifts([...shifts, response.data]);
        setNewShift({
          workerId: '',
          workerName: '',
          workerType: '',
          phone: '',
          location: '',
          date: '',
          startTime: '',
          endTime: '',
        });
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to add shift');
      }
    } else {
      setError('Please fill in all shift fields');
    }
  };

  const handleDeleteShift = async (shiftId) => {
    try {
      await axios.delete(`http://localhost:5000/api/shifts/${shiftId}`);
      setShifts(shifts.filter((shift) => shift.id !== shiftId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete shift');
    }
  };

  const filteredShifts = shifts.filter((shift) => shift.worker_id.includes(searchId));

  if (userRole !== 'manager') {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar
       userName={userName}
        activePage="shifts"
         onLogout={onLogout}
          userRole={userRole} />
      <div className="content">
        <h1>Shifts</h1>
        {error && <p className="error">{error}</p>}
        <div className="form-container">
          <input
            type="text"
            placeholder="Search by Worker ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="form-container">
          <input
            type="text"
            placeholder="Worker ID"
            value={newShift.workerId}
            onChange={handleWorkerIdChange}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Worker Name"
            value={newShift.workerName}
            readOnly
            className="form-input"
          />
          <input
            type="text"
            placeholder="Worker Type"
            value={newShift.workerType}
            readOnly
            className="form-input"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={newShift.phone}
            readOnly
            className="form-input"
          />
          <input
            type="text"
            placeholder="Location"
            value={newShift.location}
            readOnly
            className="form-input"
          />
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
          <button onClick={handleAddShift} className="download-report-btn">
            Add Shift
          </button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Worker ID</th>
                <th>Worker Name</th>
                <th>Worker Type</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredShifts.map((shift) => (
                <tr key={shift.id}>
                  <td>{shift.worker_id}</td>
                  <td>{shift.worker_name}</td>
                  <td>{shift.worker_type}</td>
                  <td>{shift.phone || 'N/A'}</td>
                  <td>{shift.location}</td>
                  <td>{shift.date}</td>
                  <td>{shift.start_time}</td>
                  <td>{shift.end_time}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteShift(shift.id)}
                      className="delete-btn"
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