// src/components/ShiftsPage.js
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './Sidebar';
<<<<<<< HEAD
import './css/general.css';
import { approvedShiftsStore } from './mockData';
=======
import './css/reset.css';
import './css/layout.css';
import './css/components.css';
import './css/themes.css';
import './css/responsive.css';
>>>>>>> 46c39febec1d91ced1444da4bfa6d8b95387220d

const ShiftsPage = ({ onLogout, userRole }) => {
  // Mock employees
  const employees = [
    {
      id: 'emp1', // Added for React key usage
      identity: '207705096',
      name: 'Worker 1',
      phone: '050-123-4567',
      location: 'Tel Aviv',
      joiningDate: '01-01-2023',
      workerType: 'Driver',
    },
    {
      id: 'emp2', // Added for React key usage
      identity: '205548491',
      name: 'Worker 2',
      phone: '052-987-6543',
      location: 'Jerusalem',
      joiningDate: '15-03-2023',
      workerType: 'Cleaner',
    },

  ];

  // Mock shifts
  const initialShifts = [
    {
      id: uuidv4().slice(0, 10),
      workerId: '207705096', // identity
      workerName: 'Worker 1',
      workerType: 'Driver',
      date: '2025-03-06',
      startTime: '08:00',
      endTime: '16:00',
      location: 'Tel Aviv',
    },
    {
      id: uuidv4().slice(0, 10),
      workerId: '205548491',
      workerName: 'Worker 2',
      workerType: 'Cleaner',
      date: '2025-03-06',
      startTime: '09:00',
      endTime: '17:00',
      location: 'Jerusalem',
    },
  ];

  const [shifts, setShifts] = useState(initialShifts);
  const [searchId, setSearchId] = useState('');
  const [newShift, setNewShift] = useState({
    workerId: '',
    workerType: 'Driver',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
  });
  const [updateWorkerId, setUpdateWorkerId] = useState('');
  const [updatedShift, setUpdatedShift] = useState({
    date: '',
    startTime: '',
    endTime: '',
    location: '',
  });

  // Mock user data
  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  const filteredShifts = shifts.filter((shift) =>
    shift.workerId.includes(searchId)
  );

  // Handle adding a new shift
  const handleAddShift = () => {
    if (
      newShift.workerId &&
      newShift.workerType &&
      newShift.date &&
      newShift.startTime &&
      newShift.endTime &&
      newShift.location
    ) {
      const foundEmployee = employees.find((e) => e.identity === newShift.workerId);
      if (!foundEmployee) {
        alert('Invalid Worker ID. Check Employees for correct numeric identity.');
        return;
      }
      if (foundEmployee.workerType !== newShift.workerType) {
        alert(`Worker with ID ${foundEmployee.identity} is a ${foundEmployee.workerType}, not a ${newShift.workerType}.`);
        return;
      }
      setShifts([
        ...shifts,
        {
          id: uuidv4().slice(0, 10),
          workerId: foundEmployee.identity,
          workerName: foundEmployee.name,
          workerType: foundEmployee.workerType,
          date: newShift.date,
          startTime: newShift.startTime,
          endTime: newShift.endTime,
          location: newShift.location,
        },
      ]);
      setNewShift({
        workerId: '',
        workerType: 'Driver',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
      });
    } else {
      alert('Please fill in all shift fields.');
    }
  };

  // Handle deleting a shift
  const handleDeleteShift = (id) => {
    setShifts(shifts.filter((shift) => shift.id !== id));
  };

  // Load shift data for updating
  const handleUpdateShift = () => {
    const shiftToUpdate = shifts.find((s) => s.workerId === updateWorkerId);
    if (shiftToUpdate) {
      setUpdatedShift({
        date: shiftToUpdate.date,
        startTime: shiftToUpdate.startTime,
        endTime: shiftToUpdate.endTime,
        location: shiftToUpdate.location,
      });
    } else {
      alert('No shift found for that Worker ID.');
      setUpdatedShift({ date: '', startTime: '', endTime: '', location: '' });
    }
  };

  // Save updated shift data
  const handleSaveUpdate = () => {
    setShifts(
      shifts.map((shift) =>
        shift.workerId === updateWorkerId ? { ...shift, ...updatedShift } : shift
      )
    );
    setUpdateWorkerId('');
    setUpdatedShift({ date: '', startTime: '', endTime: '', location: '' });
  };

  // Restrict access to managers only
  if (userRole !== 'manager') {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="shifts" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Shifts</h1>

        {/* Search by Worker ID */}
        <div className="form-container">
          <input
            type="text"
            placeholder="Search by Worker ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Add Shift */}
        <div className="form-container">
          <input
            type="text"
            placeholder="Worker ID"
            value={newShift.workerId}
            onChange={(e) => setNewShift({ ...newShift, workerId: e.target.value })}
            className="form-input"
          />
          <select
            value={newShift.workerType}
            onChange={(e) => setNewShift({ ...newShift, workerType: e.target.value })}
            className="form-input"
          >
            <option value="Driver">Driver</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Maintenance Worker">Maintenance Worker</option>
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

        {/* Update Shift */}
        <div className="form-container">
          <input
            type="text"
            placeholder="Worker ID to update"
            value={updateWorkerId}
            onChange={(e) => setUpdateWorkerId(e.target.value)}
            className="form-input"
          />
          <button onClick={handleUpdateShift} className="download-report-btn">
            Load Update
          </button>
          {updateWorkerId && (
            <>
              <input
                type="date"
                value={updatedShift.date}
                onChange={(e) => setUpdatedShift({ ...updatedShift, date: e.target.value })}
                className="form-input"
              />
              <input
                type="time"
                value={updatedShift.startTime}
                onChange={(e) => setUpdatedShift({ ...updatedShift, startTime: e.target.value })}
                className="form-input"
              />
              <input
                type="time"
                value={updatedShift.endTime}
                onChange={(e) => setUpdatedShift({ ...updatedShift, endTime: e.target.value })}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Location"
                value={updatedShift.location}
                onChange={(e) => setUpdatedShift({ ...updatedShift, location: e.target.value })}
                className="form-input"
              />
              <button onClick={handleSaveUpdate} className="download-report-btn">
                Save Update
              </button>
            </>
          )}
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Worker ID</th>
                <th>Worker Name</th>
                <th>Worker Type</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredShifts.map((shift) => {
                const emp = employees.find((e) => e.identity === shift.workerId);
                return (
                  <tr key={shift.id}>
                    <td>{shift.workerId}</td>
                    <td>{shift.workerName}</td>
                    <td>{shift.workerType}</td>
                    <td>{emp ? emp.phone : ''}</td>
                    <td>{shift.date}</td>
                    <td>{shift.startTime}</td>
                    <td>{shift.endTime}</td>
                    <td>{shift.location}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteShift(shift.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShiftsPage;