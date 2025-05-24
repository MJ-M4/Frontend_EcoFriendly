import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './Sidebar';
import './css/propose-shifts.css';
import { shiftProposalsStore } from './mockData';

const ProposeShiftsPage = ({ onLogout, userRole, userId , user }) => {
  const [proposedShifts, setProposedShifts] = useState([]);
  const [newShift, setNewShift] = useState({
    date: '',
    startTime: '',
    endTime: '',
    location: '',
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const today = new Date();
  const day = today.getDay();
  const daysUntilNextMonday = day === 0 ? 1 : (day === 1 ? 7 : 8 - day);
  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + daysUntilNextMonday);
  const nextSunday = new Date(nextMonday);
  nextSunday.setDate(nextMonday.getDate() + 6);

  const minDate = nextMonday.toISOString().split('T')[0];
  const maxDate = nextSunday.toISOString().split('T')[0];

  const handleAddShift = () => {
    if (
      newShift.date &&
      newShift.startTime &&
      newShift.endTime &&
      newShift.location &&
      newShift.date >= minDate &&
      newShift.date <= maxDate
    ) {
      if (newShift.startTime >= newShift.endTime) {
        alert('Start time must be before end time.');
        return;
      }
      setProposedShifts([
        ...proposedShifts,
        {
          id: uuidv4().slice(0, 10),
          date: newShift.date,
          startTime: newShift.startTime,
          endTime: newShift.endTime,
          location: newShift.location,
        },
      ]);
      setNewShift({ date: '', startTime: '', endTime: '', location: '' });
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  const handleDeleteShift = (id) => {
    setProposedShifts(proposedShifts.filter((shift) => shift.id !== id));
  };

  const handleSubmitProposal = () => {
    if (proposedShifts.length === 0) {
      alert('Please add at least one shift.');
      return;
    }
    const workerName = user.name;
    const workerType = 'Driver';
    shiftProposalsStore.addProposal(userId, workerName, workerType, proposedShifts);
    alert('Proposal submitted successfully!');
    setProposedShifts([]);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  if (userRole !== 'worker') {
    return <div className="error">Access Denied: Workers Only</div>;
  }

  return (
    <div className="dashboard">
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
        {isSidebarOpen ? '✖' : '☰'}
      </button>
      <Sidebar user={user} activePage="propose-shifts" onLogout={onLogout} userRole={userRole} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="content">
        <h1>Propose Shifts for Next Week</h1>
        <p>Select shifts for the week of {minDate} to {maxDate}</p>
        <div className="form-container">
          <input
            type="date"
            min={minDate}
            max={maxDate}
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
          <button onClick={handleAddShift} className="add-shift-btn">
            Add Shift
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {proposedShifts.map((shift) => (
                <tr key={shift.id}>
                  <td data-label="Date">{shift.date}</td>
                  <td data-label="Start Time">{shift.startTime}</td>
                  <td data-label="End Time">{shift.endTime}</td>
                  <td data-label="Location">{shift.location}</td>
                  <td data-label="Actions">
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
        <button onClick={handleSubmitProposal} className="submit-proposal-btn">
          Submit Proposal
        </button>
      </div>
    </div>
  );
};

export default ProposeShiftsPage;