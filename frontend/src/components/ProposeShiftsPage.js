// src/components/ProposeShiftsPage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './css/general.css';
import Sidebar from './Sidebar';

const ProposeShiftsPage = ({ onLogout, userRole, userId,userName }) => {
  const [shifts, setShifts] = useState([]);
  const [newShift, setNewShift] = useState({
    date: '',
    startTime: '',
    endTime: '',
    location: '',
  });
  const [error, setError] = useState('');

  const fetchShifts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/shifts/worker/${userId}`, {
        params: { status: 'pending' },
      });
      setShifts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch proposed shifts');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchShifts();
    }
  }, [userId]);

  const handleProposeShift = async () => {
    if (
      newShift.date &&
      newShift.startTime &&
      newShift.endTime &&
      newShift.location
    ) {
      try {
        const response = await axios.post('http://localhost:5000/api/shifts', {
          worker_id: userId,
          date: newShift.date,
          start_time: newShift.startTime,
          end_time: newShift.endTime,
          location: newShift.location,
          status: 'pending', // Workers propose shifts as pending
        });
        setShifts([...shifts, response.data]);
        setNewShift({
          date: '',
          startTime: '',
          endTime: '',
          location: '',
        });
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to propose shift');
      }
    } else {
      setError('Please fill in all shift fields');
    }
  };

  if (userRole !== 'worker') {
    return <div className="error">Access Denied: Workers Only</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar
       activePage="propose-shifts"
        onLogout={onLogout}
         userRole={userRole}
         userName={userName} />
      <div className="content">
        <h1>Propose Shifts</h1>
        {error && <p className="error">{error}</p>}
        <div className="form-container">
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
          <button onClick={handleProposeShift} className="download-report-btn">
            Propose Shift
          </button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Location</th>
                <th>Status</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => (
                <tr key={shift.id}>
                  <td>{shift.date}</td>
                  <td>{shift.start_time}</td>
                  <td>{shift.end_time}</td>
                  <td>{shift.location}</td>
                  <td>{shift.status}</td>
                  <td>{shift.submitted_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProposeShiftsPage;