// src/components/MyShiftsPage.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './css/general.css';
import Sidebar from './Sidebar';

const MyShiftsPage = ({ onLogout, userRole, userId,userName }) => {
  const [shifts, setShifts] = useState([]);
  const [error, setError] = useState('');

  const fetchShifts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/shifts/worker/${userId}`, {
        params: { status: 'approved' },
      });
      setShifts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch shifts');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchShifts();
    }
  }, [userId]);

  // Only workers have access
  if (userRole !== 'worker') {
    return <div className="error">Access Denied: Workers Only</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar
        activePage="my-shifts"
        onLogout={onLogout}
        userRole={userRole}
        userName={userName}
      />
      <div className="content">
        <h1>My Shifts</h1>
        {error && <p className="error">{error}</p>}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => (
                <tr key={shift.id}>
                  <td>{shift.date}</td>
                  <td>{shift.start_time}</td>
                  <td>{shift.end_time}</td>
                  <td>{shift.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyShiftsPage;
