import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './Sidebar';
import './css/my-shifts.css';

const MyShiftsPage = ({ onLogout, userRole }) => {
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  if (userRole !== 'worker') {
    return <div className="error">Access Denied: Workers Only</div>;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard">
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
        {isSidebarOpen ? '✖' : '☰'}
      </button>
      <Sidebar user={user} activePage="my-shifts" onLogout={onLogout} userRole={userRole} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
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
                  <td data-label="Date">{shift.date}</td>
                  <td data-label="Start Time">{shift.startTime}</td>
                  <td data-label="End Time">{shift.endTime}</td>
                  <td data-label="Location">{shift.location}</td>
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