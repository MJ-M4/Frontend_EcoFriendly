import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './Sidebar';
import './css/employees.css';

const EmployeesPage = ({ onLogout, userRole }) => {
  const initialEmployees = [
    {
      id: uuidv4(),
      identity: '207705096',
      name: 'mhagne',
      phone: '050-123-4567',
      location: 'Nazareth',
      joiningDate: '2025-01-01',
      workerType: 'Driver',
      hashedPassword: null,
    },
    {
      id: uuidv4(),
      identity: '205548491',
      name: 'jayusi',
      phone: '052-987-6543',
      location: 'Nazareth',
      joiningDate: '2025-02-15',
      workerType: 'Cleaner',
      hashedPassword: null,
    },
    {
      id: uuidv4(),
      identity: '212443412',
      name: 'Worker 3',
      phone: '051-327-6143',
      location: 'Nazareth',
      joiningDate: '2025-02-15',
      workerType: 'Maintenance Worker',
      hashedPassword: null,
    },
  ];

  const [employees, setEmployees] = useState(initialEmployees);
  const [searchValue, setSearchValue] = useState('');
  const [newEmployee, setNewEmployee] = useState({
    identity: '',
    name: '',
    phone: '',
    location: '',
    joiningDate: '',
    workerType: 'Driver',
  });
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.location.toLowerCase().includes(searchValue.toLowerCase()) ||
      emp.identity.toLowerCase().includes(searchValue.toLowerCase())
  );

  const generateRandomPassword = () => {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let newPass = '';
    for (let i = 0; i < length; i++) {
      newPass += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return newPass;
  };

  const handleGeneratePassword = () => {
    const pwd = generateRandomPassword();
    setGeneratedPassword(pwd);
  };

  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  };

  const handleAddEmployee = async () => {
    if (
      newEmployee.identity &&
      newEmployee.name &&
      newEmployee.phone &&
      newEmployee.location &&
      newEmployee.joiningDate &&
      newEmployee.workerType
    ) {
      let hashedPassword = null;
      if (generatedPassword) {
        hashedPassword = await hashPassword(generatedPassword);
      }

      const newId = uuidv4();
      setEmployees([
        ...employees,
        {
          id: newId,
          identity: newEmployee.identity,
          name: newEmployee.name,
          phone: newEmployee.phone,
          location: newEmployee.location,
          joiningDate: newEmployee.joiningDate,
          workerType: newEmployee.workerType,
          hashedPassword,
        },
      ]);
      setNewEmployee({
        identity: '',
        name: '',
        phone: '',
        location: '',
        joiningDate: '',
        workerType: 'Driver',
      });
      setGeneratedPassword('');
    } else {
      alert('Please fill in all fields to add an employee.');
    }
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
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
      <Sidebar user={user} activePage="employees" onLogout={onLogout} userRole={userRole} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="content">
        <h1>Employees</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by region or ID..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="form-container">
          <input
            type="text"
            placeholder="Identity"
            value={newEmployee.identity}
            onChange={(e) => setNewEmployee({ ...newEmployee, identity: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Name"
            value={newEmployee.name}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newEmployee.phone}
            onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Location"
            value={newEmployee.location}
            onChange={(e) => setNewEmployee({ ...newEmployee, location: e.target.value })}
            className="form-input"
          />
          <input
            type="date"
            value={newEmployee.joiningDate}
            onChange={(e) => setNewEmployee({ ...newEmployee, joiningDate: e.target.value })}
            className="form-input"
          />
          <select
            value={newEmployee.workerType}
            onChange={(e) => setNewEmployee({ ...newEmployee, workerType: e.target.value })}
            className="form-input"
          >
            <option value="Driver">Driver</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Maintenance Worker">Maintenance Worker</option>
          </select>

          <button onClick={handleGeneratePassword} className="generate-password-btn">
            Generate Password
          </button>

          {generatedPassword && (
            <input
              type="text"
              value={generatedPassword}
              readOnly
              className="form-input generated-password"
            />
          )}

          <button onClick={handleAddEmployee} className="add-employee-btn">
            Add Employee
          </button>
        </div>

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
              {filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td data-label="ID">{emp.identity}</td>
                  <td data-label="Name">{emp.name}</td>
                  <td data-label="Phone">{emp.phone}</td>
                  <td data-label="Location">{emp.location}</td>
                  <td data-label="Joining Date">{emp.joiningDate}</td>
                  <td data-label="Worker Type">{emp.workerType}</td>
                  <td data-label="Actions">
                    <button
                      onClick={() => handleDeleteEmployee(emp.id)}
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