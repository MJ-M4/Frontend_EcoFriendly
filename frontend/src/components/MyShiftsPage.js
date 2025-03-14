import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './Sidebar';
import './css/general.css';

const MyShiftsPage = ({ onLogout, userRole }) => {
  // Mock shift data for the worker. In real apps, you fetch from server using their ID.
  const [myShifts, setMyShifts] = useState([
    {
      id: uuidv4().slice(0, 10),
      date: '2025-04-10',
      startTime: '08:00',
      endTime: '16:00',
      location: 'Tel Aviv',
    },
    {
      id: uuidv4().slice(0, 10),
      date: '2025-04-11',
      startTime: '07:00',
      endTime: '15:00',
      location: 'Haifa',
    },
  ]);

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  // If not worker, or if user tries direct route
  if (userRole !== 'worker') {
    return <div className="error">Access Denied: Workers Only</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="my-shifts" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>My Shifts</h1>
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
              {myShifts.map((shift) => (
                <tr key={shift.id}>
                  <td>{shift.date}</td>
                  <td>{shift.startTime}</td>
                  <td>{shift.endTime}</td>
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
