import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './css/general.css';

const EmployeesPage = ({ onLogout, userRole }) => {
  const [employees, setEmployees] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [newEmployee, setNewEmployee] = useState({
    identity: '',
    name: '',
    phone: '',
    location: '',
    joiningDate: '',
    workerType: 'Driver',
    role: 'worker',
  });
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({}); // State to track visibility of passwords in the table

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        console.log('Fetched employees:', response.data);
        setEmployees(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching employees:', err.message);
        console.error('Error details:', err.response ? err.response.data : err);
        setError('Failed to fetch employees. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.location.toLowerCase().includes(searchValue.toLowerCase()) ||
      emp.user_id.toLowerCase().includes(searchValue.toLowerCase())
  );

  const generateRandomPassword = () => {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let newPass = '';
    for (let i = 0; i < length; i++) {
      newPass += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setGeneratedPassword(newPass);
  };

  const handleAddEmployee = async () => {
    if (
      newEmployee.identity &&
      newEmployee.name &&
      newEmployee.phone &&
      newEmployee.location &&
      newEmployee.joiningDate &&
      newEmployee.role &&
      (newEmployee.role === 'worker' ? newEmployee.workerType : true)
    ) {
      if (!generatedPassword) {
        setError('Please generate a password for the new user.');
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/api/users', {
          user_id: newEmployee.identity,
          name: newEmployee.name,
          phone: newEmployee.phone,
          location: newEmployee.location,
          joining_date: newEmployee.joiningDate,
          role: newEmployee.role,
          worker_type: newEmployee.role === 'worker' ? newEmployee.workerType : null,
          password: generatedPassword,
        });

        setEmployees([...employees, response.data]);
        setNewEmployee({
          identity: '',
          name: '',
          phone: '',
          location: '',
          joiningDate: '',
          workerType: 'Driver',
          role: 'worker',
        });
        setGeneratedPassword('');
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to add employee. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Please fill in all required fields to add an employee.');
    }
  };

  const handleDeleteEmployee = async (userId) => {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setEmployees(employees.filter((emp) => emp.user_id !== userId));
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete employee. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (userId) => {
    setShowPasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  if (userRole !== 'manager') {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="employees" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Employees</h1>

        {error && <p className="error-message">{error}</p>}
        {isLoading && <p>Loading...</p>}

        <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
          <input
            type="text"
            placeholder="Search by region or ID..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="search-input"
          />
        </div>

        <div
          style={{
            marginBottom: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <input
            type="text"
            placeholder="Identity (User ID)"
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
            value={newEmployee.role}
            onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
            className="form-input"
          >
            <option value="worker">Worker</option>
            <option value="manager">Manager</option>
          </select>
          {newEmployee.role === 'worker' && (
            <select
              value={newEmployee.workerType}
              onChange={(e) => setNewEmployee({ ...newEmployee, workerType: e.target.value })}
              className="form-input"
            >
              <option value="Driver">Driver</option>
              <option value="Cleaner">Cleaner</option>
              <option value="Maintenance Worker">Maintenance Worker</option>
            </select>
          )}

          <button
            onClick={generateRandomPassword}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              height: '40px',
              margin: '5px',
            }}
          >
            Generate Password
          </button>

          {generatedPassword && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={generatedPassword}
                readOnly
                className="form-input"
                style={{ backgroundColor: '#f0f0f0', maxWidth: '300px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          )}

          <button
            onClick={handleAddEmployee}
            className="download-report-btn"
            style={{ padding: '10px 20px', height: '40px', width: '200px', margin: '5px' }}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Employee'}
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
                <th>Role</th>
                <th>Worker Type</th>
                <th>Hashed Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr key={emp.user_id}>
                    <td>{emp.user_id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.location}</td>
                    <td>{emp.joining_date}</td>
                    <td>{emp.role}</td>
                    <td>{emp.worker_type || 'N/A'}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {showPasswords[emp.user_id] ? emp.password : '••••••••'}
                        </span>
                        <button
                          onClick={() => togglePasswordVisibility(emp.user_id)}
                          style={{
                            padding: '5px 10px',
                            backgroundColor: '#3498db',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                          }}
                        >
                          {showPasswords[emp.user_id] ? 'Hide' : 'Show'}
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteEmployee(emp.user_id)}
                        className="delete-btn"
                        disabled={isLoading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No employees found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;