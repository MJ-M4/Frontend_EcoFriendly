import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './css/my-shifts.css';

const MyShiftsPage = ({ onLogout, userRole, user }) => {
  const [myShifts, setMyShifts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyShifts = async () => {
      try {
        const response = await fetch('http://localhost:5005/local/getShifts');
        const data = await response.json();
        if (data.status === 'success') {
          console.log('Fetched shifts:', data.shifts);
          // console.log('User identity:', user);
          // Filter shifts by the logged-in worker's identity
          const workerShifts = data.shifts.filter(
            (shift) => shift.worker_id === user.identity
          );
          setMyShifts(workerShifts || []);
        } else {
          alert('Failed to fetch shifts: ' + data.message);
        }
      } catch (error) {
        alert('Error fetching shifts: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyShifts();
  }, [user.identity]);

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
        {isLoading ? (
          <p>Loading...</p>
        ) : myShifts.length === 0 ? (
          <p>No shifts assigned.</p>
        ) : (
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
                  <tr key={shift.shift_id}>
                    <td data-label="Date">{shift.date}</td>
                    <td data-label="Start Time">{shift.start_time.slice(0, 5)}</td>
                    <td data-label="End Time">{shift.end_time.slice(0, 5)}</td>
                    <td data-label="Location">{shift.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyShiftsPage;