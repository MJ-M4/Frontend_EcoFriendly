<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./css/employees.css";

const EmployeesPage = ({ onLogout, userRole, user }) => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "http://localhost:5005/local/getEmployees"
        );
        const data = await response.json();
        if (data.status === "success") {
          console.log("Fetched employees:", data.employees);
          setEmployees(data.employees || []);
        } else {
          console.error("Failed to fetch employees:", data.message);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEmployees();
  }, []);

  const [searchValue, setSearchValue] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    identity: "",
    name: "",
    phone: "",
    location: "",
    joining_date: "",
    worker_type: "Driver",
    role: "worker",
  });
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredEmployees = (employees || []).filter(
    (emp) =>
      emp.location?.toLowerCase().includes(searchValue.toLowerCase()) ||
      emp.identity?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const generateRandomPassword = () => {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let newPass = "";
    for (let i = 0; i < length; i++) {
      newPass += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return newPass;
  };

  const handleGeneratePassword = () => {
    const pwd = generateRandomPassword();
    setGeneratedPassword(pwd);
  };


  const handleAddEmployee = async () => {
    if (
      newEmployee.identity &&
      newEmployee.name &&
      newEmployee.phone &&
      newEmployee.location &&
      newEmployee.joining_date &&
      newEmployee.worker_type &&
      newEmployee.role
    ) {

      const employeePayload = {
        identity: newEmployee.identity,
        name: newEmployee.name,
        phone: newEmployee.phone,
        location: newEmployee.location,
        joining_date: newEmployee.joining_date,
        worker_type: newEmployee.worker_type,
        role: newEmployee.role,
        password: generatedPassword || "", // Send plain text password to backend
      };

      try {
        const response = await fetch(
          "http://localhost:5005/local/addEmployee",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(employeePayload),
          }
        );

        const data = await response.json();
        console.log("API2025 Response:", data);
        if (data.status === "success") {
          console.log("Employee added successfully:", data.employees);
          setEmployees((prev) => [...prev, data.employees]);
          alert("Employee added successfully");
          setNewEmployee({
            identity: "",
            name: "",
            phone: "",
            location: "",
            joining_date: "",
            worker_type: "Driver",
            role: "worker",
          });
          setGeneratedPassword("");
        } else {
          console.error("Failed to add employee:", data.message);
        }
      } catch (error) {
        console.error("Error adding employee:", error);
        alert("Server error");
      }
    }
  };

  const handleDeleteEmployee = async (identity) => {
    if (!confirm(`Delete Employee ${identity}?`)) return;
    try {
      const response = await fetch(
        `http://localhost:5005/local/deleteEmployee/${identity}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        setEmployees(employees.filter((emp) => emp.identity !== identity));
        alert("Employee deleted successfully");
      } else {
        console.error("Failed to delete employee:", data.message);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Server error");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

=======
// src/components/EmployeesPage.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './css/general.css';
import Sidebar from './Sidebar';

const EmployeesPage = ({ onLogout, userRole, userId, userName }) => {
  if (userRole !== 'manager') {
    return <div className="error">Access Denied: Managers Only</div>;
  }
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae

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
<<<<<<< HEAD
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? "✖" : "☰"}
      </button>
      <Sidebar
        user={user}
        activePage="employees"
        onLogout={onLogout}
        userRole={userRole}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
=======
      <Sidebar
        activePage="employees"
        onLogout={onLogout}
        userRole={userRole}
        userName={userName}
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
      />
      <div className="content">
        <h1>Employees</h1>
        {error && <p className="error">{error}</p>}

<<<<<<< HEAD
        <div className="search-container">
=======
        <div className="form-container">
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
          <input
            type="text"
            placeholder="Search by ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="search-input"
          />
        </div>

<<<<<<< HEAD
        <div className="form-container">
          <input
            type="text"
            placeholder="Identity"
            value={newEmployee.identity}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, identity: e.target.value })
            }
=======
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
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
            className="form-input"
          />

          <input
            type="text"
            name="name"
            placeholder="Name"
            autoComplete="off"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
            className="form-input"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            autoComplete="off"
            value={newEmployee.phone}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, phone: e.target.value })
            }
            className="form-input"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            autoComplete="off"
            value={newEmployee.location}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, location: e.target.value })
            }
            className="form-input"
          />

          <input
            type="date"
<<<<<<< HEAD
            value={newEmployee.joining_date}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, joining_date: e.target.value })
            }
=======
            name="joiningDate"
            autoComplete="off"
            value={newEmployee.joiningDate}
            onChange={(e) => setNewEmployee({ ...newEmployee, joiningDate: e.target.value })}
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
            className="form-input"
          />

          <select
<<<<<<< HEAD
            value={newEmployee.worker_type}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, worker_type: e.target.value })
            }
            className="form-input"
          >
            <option value="Driver">Driver</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Maintenance Worker">Maintenance Worker</option>
          </select>

          <select
=======
            name="role"
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
            value={newEmployee.role}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, role: e.target.value })
            }
            className="form-input"
          >
            <option value="worker">Worker</option>
            <option value="manager">Manager</option>
          </select>
<<<<<<< HEAD
=======

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
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae

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
<<<<<<< HEAD
            onClick={handleGeneratePassword}
            className="generate-password-btn"
=======
            type="button"
            onClick={generatePassword}
            className="generate-password-btn"
            style={{ backgroundColor: '#28a745', color: 'white' }}
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
          >
            Generate Password
          </button>

<<<<<<< HEAD
          {generatedPassword && (
            <input
              type="text"
              value={generatedPassword}
              readOnly
              className="form-input generated-password"
            />
          )}

          <button onClick={handleAddEmployee} className="btn">
            Add Employee
          </button>
        </div>
        { isLoading ? (
          <p>Loading employees...</p>
        ) : (
          <p className="employee-count">
            Total Employees: {filteredEmployees.length}
          </p>
        )}
=======
          {/* Use "submit" type for the main button to trigger handleAddEmployee */}
          <button type="submit" className="download-report-btn">
            Add Employee
          </button>
        </form>

>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Joining Date</th>
                <th>Worker Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
<<<<<<< HEAD
              {filteredEmployees.map((emp) => (
                <tr key={emp.identity}>
                  <td data-label="ID">{emp.identity}</td>
                  <td data-label="Name">{emp.name}</td>
                  <td data-label="Phone">{emp.phone}</td>
                  <td data-label="Location">{emp.location}</td>
                  <td data-label="Joining Date">{emp.joining_date}</td>
                  <td data-label="Worker Type">{emp.worker_type}</td>
                  <td data-label="Actions">
                    <button
                      onClick={() => handleDeleteEmployee(emp.identity)}
=======
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
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
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
