// src/components/EmployeesPage.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './css/general.css';
import Sidebar from './Sidebar';

const EmployeesPage = ({ onLogout, userRole, userId, userName }) => {
  if (userRole !== 'manager') {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [newEmployee, setNewEmployee] = useState({
    userId: '',
    name: '',
    phone: '',
    location: '',
    joiningDate: '',
    role: 'worker',
    workerType: 'Driver',
    password: '',
  });

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setEmployees(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch employees');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = async (e) => {
    e.preventDefault(); // if using a form submit
    if (
      !newEmployee.userId ||
      !newEmployee.name ||
      !newEmployee.phone ||
      !newEmployee.location ||
      !newEmployee.joiningDate ||
      !newEmployee.role ||
      !newEmployee.password ||
      (newEmployee.role === 'worker' && !newEmployee.workerType)
    ) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/users', {
        user_id: newEmployee.userId,
        name: newEmployee.name,
        phone: newEmployee.phone,
        location: newEmployee.location,
        joining_date: newEmployee.joiningDate,
        worker_type: newEmployee.role === 'worker' ? newEmployee.workerType : null,
        role: newEmployee.role,
        password: newEmployee.password,
      });
      fetchEmployees();
      setNewEmployee({
        userId: '',
        name: '',
        phone: '',
        location: '',
        joiningDate: '',
        role: 'worker',
        workerType: 'Driver',
        password: '',
      });
      setError('');
      setShowPassword(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add employee');
    }
  };

  const handleDeleteEmployee = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setEmployees(employees.filter((emp) => emp.user_id !== userId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete employee');
    }
  };

  const generatePassword = () => {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let generated = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generated += charset[randomIndex];
    }
    setNewEmployee({ ...newEmployee, password: generated });
    setError('');
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.user_id.toLowerCase().includes(searchId.toLowerCase())
  );

  return (
    <div className="dashboard">
      <Sidebar
        activePage="employees"
        onLogout={onLogout}
        userRole={userRole}
        userName={userName}
      />
      <div className="content">
        <h1>Employees</h1>
        {error && <p className="error">{error}</p>}

        <div className="form-container">
          <input
            type="text"
            placeholder="Search by ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Wrap add-employee fields in a form with autoComplete="off" */}
        <form className="form-container" autoComplete="off" onSubmit={handleAddEmployee}>

          {/* Hidden dummy field to further discourage autofill */}
          <input
            style={{ display: 'none' }}
            type="text"
            name="fakeHiddenUsername"
            autoComplete="new-username"
          />

          <input
            type="text"
            name="userId"
            placeholder="User ID"
            autoComplete="off"
            value={newEmployee.userId}
            onChange={(e) => setNewEmployee({ ...newEmployee, userId: e.target.value })}
            className="form-input"
          />

          <input
            type="text"
            name="name"
            placeholder="Name"
            autoComplete="off"
            value={newEmployee.name}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            className="form-input"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            autoComplete="off"
            value={newEmployee.phone}
            onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
            className="form-input"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            autoComplete="off"
            value={newEmployee.location}
            onChange={(e) => setNewEmployee({ ...newEmployee, location: e.target.value })}
            className="form-input"
          />

          <input
            type="date"
            name="joiningDate"
            autoComplete="off"
            value={newEmployee.joiningDate}
            onChange={(e) => setNewEmployee({ ...newEmployee, joiningDate: e.target.value })}
            className="form-input"
          />

          <select
            name="role"
            value={newEmployee.role}
            onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
            className="form-input"
          >
            <option value="worker">Worker</option>
            <option value="manager">Manager</option>
          </select>

          {newEmployee.role === 'worker' && (
            <select
              name="workerType"
              value={newEmployee.workerType}
              onChange={(e) => setNewEmployee({ ...newEmployee, workerType: e.target.value })}
              className="form-input"
            >
              <option value="Driver">Driver</option>
              <option value="Cleaner">Cleaner</option>
              <option value="Maintenance Worker">Maintenance Worker</option>
            </select>
          )}

          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              autoComplete="new-password"  // <-- recommended for new password fields
              value={newEmployee.password}
              onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
              className="form-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="show-password-btn"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            type="button"
            onClick={generatePassword}
            className="generate-password-btn"
            style={{ backgroundColor: '#28a745', color: 'white' }}
          >
            Generate Password
          </button>

          {/* Use "submit" type for the main button to trigger handleAddEmployee */}
          <button type="submit" className="download-report-btn">
            Add Employee
          </button>
        </form>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Joining Date</th>
                <th>Role</th>
                <th>Worker Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(emp => (
                <tr key={emp.user_id}>
                  <td>{emp.user_id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.location}</td>
                  <td>{emp.joining_date}</td>
                  <td>{emp.role}</td>
                  <td>{emp.worker_type || 'N/A'}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteEmployee(emp.user_id)}
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

export default EmployeesPage;
