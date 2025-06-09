import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/propose-shifts.css';
import './css/global.css';


const ProposeShiftsPage = ({ onLogout, userRole , user }) => {
  const [proposedShifts, setProposedShifts] = useState([]);
  const [newShift, setNewShift] = useState({
    date: '',
    startTime: '',
    endTime: '',
    location: '',
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const today = new Date();
  const day = today.getDay();// 0 = الأحد، 1 = الاثنين، ... 6 = السبت

const daysUntilNextSunday = day === 0 ? 7 : (7 - day);
const nextSunday = new Date(today);
nextSunday.setDate(today.getDate() + daysUntilNextSunday);
const nextSaturday = new Date(nextSunday);
nextSaturday.setDate(nextSunday.getDate() + 6);

const minDate = nextSunday.toISOString().split('T')[0];
const maxDate = nextSaturday.toISOString().split('T')[0];

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
          id: Date.now().toString(),
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

const handleSubmitProposal = async () => {
    if (proposedShifts.length === 0) {
      alert('Please add at least one shift.');
      return;
    }
    try {
      for (const shift of proposedShifts) {
        const proposalPayload = {
          worker_id: user.identity,
          worker_name: user.name,
          worker_type: user.worker_type || 'Driver',
          date: shift.date,
          start_time: shift.startTime + ':00',
          end_time: shift.endTime + ':00',
          location: shift.location,
        };
        const response = await fetch('http://localhost:5005/local/proposeShift', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(proposalPayload),
        });
        const data = await response.json();
        if (data.status !== 'success') {
          throw new Error(data.message);
        }
      }
      alert('Proposal submitted successfully!');
      setProposedShifts([]);
    } catch (error) {
      alert('Error submitting proposal: ' + error.message);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


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
          <button onClick={handleAddShift} className="btn">
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