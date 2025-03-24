// src/components/ShiftsPage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './css/general.css';
import Sidebar from './Sidebar';

const ShiftsPage = ({ onLogout, userRole, userName }) => {
  const [shifts, setShifts] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState('');

  // SHIFT form fields: manager must fill them manually
  const [newShift, setNewShift] = useState({
    workerId: '',
    workerName: '',
    workerType: '',
    phone: '',
    location: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  // Load "approved" shifts on component mount
  const fetchShifts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/shifts', {
        params: { status: 'approved' },
      });
      setShifts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch shifts');
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  // ------------
  // NO AUTO-FETCH of worker from /api/users. 
  // The manager manually types everything.
  // ------------

  // Track text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewShift((prev) => ({ ...prev, [name]: value }));
  };

  // Create SHIFT
  const handleAddShift = async () => {
    // Validate required fields
    if (
      !newShift.workerId ||
      !newShift.workerName ||
      !newShift.workerType ||
      !newShift.phone ||
      !newShift.location ||
      !newShift.date ||
      !newShift.startTime ||
      !newShift.endTime
    ) {
      setError('Please fill in all shift fields');
      return;
    }

    try {
      // POST to create a shift with status=approved
      const response = await axios.post('http://localhost:5000/api/shifts', {
        worker_id: newShift.workerId,
        date: newShift.date,
        start_time: newShift.startTime,
        end_time: newShift.endTime,
        location: newShift.location,
        status: 'approved',
      });

      // SHIFT created => add to state or re-fetch
      setShifts([...shifts, response.data]);

      // Clear form
      setNewShift({
        workerId: '',
        workerName: '',
        workerType: '',
        phone: '',
        location: '',
        date: '',
        startTime: '',
        endTime: '',
      });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add shift');
    }
  };

  // Delete SHIFT
  const handleDeleteShift = async (shiftId) => {
    try {
      await axios.delete(`http://localhost:5000/api/shifts/${shiftId}`);
      setShifts(shifts.filter((shift) => shift.id !== shiftId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete shift');
    }
  };

  // Filter SHIFT table by worker ID
  const filteredShifts = shifts.filter((shift) =>
    shift.worker_id.includes(searchId)
  );

  // Manager-only
  if (userRole !== 'manager') {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar
        userName={userName} // manager name
        activePage="shifts"
        onLogout={onLogout}
        userRole={userRole}
      />
      <div className="content">
        <h1>Shifts</h1>
        {error && <p className="error">{error}</p>}

        {/* Search Shifts by Worker ID */}
        <div className="form-container">
          <input
            type="text"
            placeholder="Search by Worker ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Add SHIFT form */}
        <div className="form-container">
          <input
            type="text"
            name="workerId"
            placeholder="Worker ID"
            value={newShift.workerId}
            onChange={handleChange}
            className="form-input"
          />

          <input
            type="text"
            name="workerName"
            placeholder="Worker Name"
            value={newShift.workerName}
            onChange={handleChange}
            className="form-input"
          />

          <input
            type="text"
            name="workerType"
            placeholder="Worker Type (Driver, Cleaner...)"
            value={newShift.workerType}
            onChange={handleChange}
            className="form-input"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={newShift.phone}
            onChange={handleChange}
            className="form-input"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newShift.location}
            onChange={handleChange}
            className="form-input"
          />

          <input
            type="date"
            name="date"
            value={newShift.date}
            onChange={handleChange}
            className="form-input"
          />

          <input
            type="time"
            name="startTime"
            value={newShift.startTime}
            onChange={handleChange}
            className="form-input"
          />

          <input
            type="time"
            name="endTime"
            value={newShift.endTime}
            onChange={handleChange}
            className="form-input"
          />

          <button onClick={handleAddShift} className="download-report-btn">
            Add Shift
          </button>
        </div>

        {/* SHIFT table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Worker ID</th>
                <th>Worker Name</th>
                <th>Worker Type</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredShifts.map((shift) => (
                <tr key={shift.id}>
                  <td>{shift.worker_id}</td>
                  <td>{shift.worker_name}</td>
                  <td>{shift.worker_type}</td>
                  <td>{shift.phone || 'N/A'}</td>
                  <td>{shift.location}</td>
                  <td>{shift.date}</td>
                  <td>{shift.start_time}</td>
                  <td>{shift.end_time}</td>
                  <td>
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
      </div>
    </div>
  );
};

export default ShiftsPage;
