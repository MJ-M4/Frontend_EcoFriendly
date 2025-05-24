import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './Sidebar';
import './css/shifts.css';
import { approvedShiftsStore } from './mockData';

const ShiftsPage = ({ onLogout, userRole, user }) => {
  const employees = [
    {
      id: 'emp1',
      identity: '207705096',
      name: 'Worker 1',
      phone: '050-123-4567',
      location: 'Tel Aviv',
      joiningDate: '01-01-2023',
      workerType: 'Driver',
    },
    {
      id: 'emp2',
      identity: '205548491',
      name: 'Worker 2',
      phone: '052-987-6543',
      location: 'Jerusalem',
      joiningDate: '15-03-2023',
      workerType: 'Cleaner',
    },
  ];

  const initialShifts = [
    {
      id: uuidv4().slice(0, 10),
      workerId: '207705096',
      workerName: 'Worker 1',
      workerType: 'Driver',
      date: '2025-03-17',
      startTime: '09:00',
      endTime: '17:00',
      location: 'Tel Aviv',
    },
    {
      id: uuidv4().slice(0, 10),
      workerId: '205548491',
      workerName: 'Worker 2',
      workerType: 'Cleaner',
      date: '2025-03-18',
      startTime: '08:00',
      endTime: '16:00',
      location: 'Jerusalem',
    },
  ];

  const [shifts, setShifts] = useState([...(approvedShiftsStore.shifts || []), ...initialShifts]);
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredShifts = shifts.filter((shift) => shift.workerId.includes(searchId));

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

  const handleDeleteShift = (id) => {
    setShifts(shifts.filter((shift) => shift.id !== id));
  };

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

  const handleSaveUpdate = () => {
    setShifts(
      shifts.map((shift) =>
        shift.workerId === updateWorkerId ? { ...shift, ...updatedShift } : shift
      )
    );
    setUpdateWorkerId('');
    setUpdatedShift({ date: '', startTime: '', endTime: '', location: '' });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (userRole !== 'manager') {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  return (
    <div className="dashboard">
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
        {isSidebarOpen ? '✖' : '☰'}
      </button>
      <Sidebar user={user} activePage="shifts" onLogout={onLogout} userRole={userRole} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="content">
        <h1>Shifts</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Worker ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="form-container add-shift-form">
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
          <button onClick={handleAddShift} className="action-btn">
            Add Shift
          </button>
        </div>
        <div className="form-container update-shift-form">
          <input
            type="text"
            placeholder="Worker ID to update"
            value={updateWorkerId}
            onChange={(e) => setUpdateWorkerId(e.target.value)}
            className="form-input"
          />
          <button onClick={handleUpdateShift} className="action-btn">
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
              <button onClick={handleSaveUpdate} className="action-btn">
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
                    <td data-label="Worker ID">{shift.workerId}</td>
                    <td data-label="Worker Name">{shift.workerName}</td>
                    <td data-label="Worker Type">{shift.workerType}</td>
                    <td data-label="Phone">{emp ? emp.phone : ''}</td>
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