import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './css/shifts.css';

const ShiftsPage = ({ onLogout, userRole, user }) => {
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [newShift, setNewShift] = useState({
    worker_id: '',
    worker_type: 'Driver',
    date: '',
    start_time: '',
    end_time: '',
    location: '',
  });
  const [updateWorkerId, setUpdateWorkerId] = useState('');
  const [updatedShift, setUpdatedShift] = useState({
    shift_id: '',
    date: '',
    start_time: '',
    end_time: '',
    location: '',
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch employees and shifts on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch employees
        const empResponse = await fetch('http://localhost:5005/local/getEmployees');
        const empData = await empResponse.json();
        if (empData.status === 'success') {
          console.log('Fetched employees:', empData.employees);
          setEmployees(empData.employees || []);
        } else {
          alert('Failed to fetch employees: ' + empData.message);
        }

        // Fetch shifts
        const shiftResponse = await fetch('http://localhost:5005/local/getShifts');
        const shiftData = await shiftResponse.json();
        if (shiftData.status === 'success') {
          console.log('Fetched shifts:', shiftData.shifts);
          setShifts(shiftData.shifts || []);
        } else {
          alert('Failed to fetch shifts: ' + shiftData.message);
        }
      } catch (error) {
        alert('Error fetching data: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredShifts = shifts.filter((shift) => shift.worker_id.includes(searchId));

  const handleAddShift = async () => {
    if (
      newShift.worker_id &&
      newShift.worker_type &&
      newShift.date &&
      newShift.start_time &&
      newShift.end_time &&
      newShift.location
    ) {
      const foundEmployee = employees.find((e) => e.identity === newShift.worker_id);
      if (!foundEmployee) {
        alert('Invalid Worker ID. Check Employees for correct numeric identity.');
        return;
      }
      if (foundEmployee.worker_type !== newShift.worker_type) {
        alert(`Worker with ID ${foundEmployee.identity} is a ${foundEmployee.worker_type}, not a ${newShift.worker_type}.`);
        return;
      }

      const shiftPayload = {
        worker_id: newShift.worker_id,
        worker_name: foundEmployee.name,
        worker_type: newShift.worker_type,
        date: newShift.date,
        start_time: newShift.start_time + ':00', // Ensure seconds are included
        end_time: newShift.end_time + ':00',
        location: newShift.location,
      };

      try {
        const response = await fetch('http://localhost:5005/local/addShift', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(shiftPayload),
        });
        const data = await response.json();
        if (data.status === 'success') {
          setShifts([...shifts, data.shift]);
          setNewShift({
            worker_id: '',
            worker_type: 'Driver',
            date: '',
            start_time: '',
            end_time: '',
            location: '',
          });
          alert('Shift added successfully');
        } else {
          alert('Failed to add shift: ' + data.message);
        }
      } catch (error) {
        alert('Error adding shift: ' + error.message);
      }
    } else {
      alert('Please fill in all shift fields.');
    }
  };

  const handleDeleteShift = async (shiftId) => {
    if (!confirm(`Delete shift ${shiftId}?`)) return;
    try {
      const response = await fetch(`http://localhost:5005/local/deleteShift/${shiftId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.status === 'success') {
        setShifts(shifts.filter((shift) => shift.shift_id !== shiftId));
        alert('Shift deleted successfully');
      } else {
        alert('Failed to delete shift: ' + data.message);
      }
    } catch (error) {
      alert('Error deleting shift: ' + error.message);
    }
  };

  const handleUpdateShift = (shift) => {
    setUpdateWorkerId(shift.worker_id);
    setUpdatedShift({
      shift_id: shift.shift_id,
      date: shift.date,
      start_time: shift.start_time.slice(0, 5), // Remove seconds
      end_time: shift.end_time.slice(0, 5),
      location: shift.location,
    });
  };

  const handleSaveUpdate = async () => {
    if (
      updatedShift.shift_id &&
      updatedShift.date &&
      updatedShift.start_time &&
      updatedShift.end_time &&
      updatedShift.location
    ) {
      try {
        const response = await fetch(`http://localhost:5005/local/updateShift/${updatedShift.shift_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            date: updatedShift.date,
            start_time: updatedShift.start_time + ':00',
            end_time: updatedShift.end_time + ':00',
            location: updatedShift.location,
          }),
        });
        const data = await response.json();
        if (data.status === 'success') {
          setShifts(
            shifts.map((shift) =>
              shift.shift_id === updatedShift.shift_id
                ? { ...shift, ...data.shift }
                : shift
            )
          );
          setUpdateWorkerId('');
          setUpdatedShift({ shift_id: '', date: '', start_time: '', end_time: '', location: '' });
          alert('Shift updated successfully');
        } else {
          alert('Failed to update shift: ' + data.message);
        }
      } catch (error) {
        alert('Error updating shift: ' + error.message);
      }
    } else {
      alert('Please fill in all update fields.');
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
      <Sidebar user={user} activePage="shifts" onLogout={onLogout} userRole={userRole} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="content">
        <h1>Shifts</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
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
                value={newShift.worker_id}
                onChange={(e) => setNewShift({ ...newShift, worker_id: e.target.value })}
                className="form-input"
              />
              <select
                value={newShift.worker_type}
                onChange={(e) => setNewShift({ ...newShift, worker_type: e.target.value })}
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
                value={newShift.start_time}
                onChange={(e) => setNewShift({ ...newShift, start_time: e.target.value })}
                className="form-input"
              />
              <input
                type="time"
                value={newShift.end_time}
                onChange={(e) => setNewShift({ ...newShift, end_time: e.target.value })}
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
            <div className="form-container update-shift-form">
              <input
                type="text"
                placeholder="Worker ID to update"
                value={updateWorkerId}
                onChange={(e) => setUpdateWorkerId(e.target.value)}
                className="form-input"
              />
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
                    value={updatedShift.start_time}
                    onChange={(e) => setUpdatedShift({ ...updatedShift, start_time: e.target.value })}
                    className="form-input"
                  />
                  <input
                    type="time"
                    value={updatedShift.end_time}
                    onChange={(e) => setUpdatedShift({ ...updatedShift, end_time: e.target.value })}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={updatedShift.location}
                    onChange={(e) => setUpdatedShift({ ...updatedShift, location: e.target.value })}
                    className="form-input"
                  />
                  <button onClick={handleSaveUpdate} className="btn">
                    Save Update
                  </button>
                </>
              )}
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Shift ID</th>
                    <th>Worker ID</th>
                    <th>Worker Name</th>
                    <th>Worker Type</th>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShifts.map((shift) => (
                    <tr key={shift.shift_id}>
                      <td data-label="Shift ID">{shift.shift_id}</td>
                      <td data-label="Worker ID">{shift.worker_id}</td>
                      <td data-label="Worker Name">{shift.worker_name}</td>
                      <td data-label="Worker Type">{shift.worker_type}</td>
                      <td data-label="Date">{shift.date}</td>
                      <td data-label="Start Time">{shift.start_time.slice(0, 5)}</td>
                      <td data-label="End Time">{shift.end_time.slice(0, 5)}</td>
                      <td data-label="Location">{shift.location}</td>
                      <td data-label="Actions">
                        <button
                          onClick={() => handleUpdateShift(shift)}
                          className="edit-btn"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteShift(shift.shift_id)}
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
          </>
        )}
      </div>
    </div>
  );
};

export default ShiftsPage;