<<<<<<< HEAD
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/propose-shifts.css';
import './css/global.css';


const ProposeShiftsPage = ({ onLogout, userRole , user }) => {
  const [proposedShifts, setProposedShifts] = useState([]);
=======
// src/components/ProposeShiftsPage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './css/general.css';
import Sidebar from './Sidebar';

const ProposeShiftsPage = ({ onLogout, userRole, userId,userName }) => {
  const [shifts, setShifts] = useState([]);
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
  const [newShift, setNewShift] = useState({
    date: '',
    startTime: '',
    endTime: '',
    location: '',
  });
<<<<<<< HEAD
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
=======
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
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae

  const handleProposeShift = async () => {
    if (
      newShift.date &&
      newShift.startTime &&
      newShift.endTime &&
      newShift.location
    ) {
<<<<<<< HEAD
      if (newShift.startTime >= newShift.endTime) {
        alert('Start time must be before end time.');
        return;
      }
      setProposedShifts([
        ...proposedShifts,
        {
          id: Date.now().toString(),
=======
      try {
        const response = await axios.post('http://localhost:5000/api/shifts', {
          worker_id: userId,
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
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

<<<<<<< HEAD
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
=======
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
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
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
<<<<<<< HEAD
          <button onClick={handleAddShift} className="btn">
            Add Shift
=======
          <button onClick={handleProposeShift} className="download-report-btn">
            Propose Shift
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
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
<<<<<<< HEAD
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
=======
                  <td>{shift.date}</td>
                  <td>{shift.start_time}</td>
                  <td>{shift.end_time}</td>
                  <td>{shift.location}</td>
                  <td>{shift.status}</td>
                  <td>{shift.submitted_at}</td>
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
                </tr>
              ))}
            </tbody>
          </table>
        </div>
<<<<<<< HEAD
        <button onClick={handleSubmitProposal} className="submit-proposal-btn">
          Submit Proposal
        </button>
=======
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
      </div>
    </div>
  );
};

export default ProposeShiftsPage;