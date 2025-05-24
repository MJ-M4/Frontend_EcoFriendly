import React, { useState, useEffect } from 'react';
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
    joining_date: '',
    worker_type: 'Driver',
    password: '',  
  });
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const user = { name: user.name, avatar: '/images/sami.png' };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/employees/getEmployees', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setEmployees(data);
      } else {
        setError(data.error || 'Failed to fetch employees');
      }
    } catch (err) {
      setError('An error occurred while fetching employees');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEmployees = employees.filter(
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
    setNewEmployee({ ...newEmployee, password: pwd });  
  };

  const handleAddEmployee = async () => {
    if (
      newEmployee.identity &&
      newEmployee.name &&
      newEmployee.phone &&
      newEmployee.location &&
      newEmployee.joining_date &&
      newEmployee.worker_type &&
      newEmployee.password 
    ) {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/employees/addEmployees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identity: newEmployee.identity,
            name: newEmployee.name,
            phone: newEmployee.phone,
            location: newEmployee.location,
            joining_date: newEmployee.joining_date,
            worker_type: newEmployee.worker_type,
            password: newEmployee.password,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setEmployees([...employees, data]);
          setNewEmployee({
            identity: '',
            name: '',
            phone: '',
            location: '',
            joining_date: '',
            worker_type: 'Driver',
            password: '',
          });
          setGeneratedPassword('');
          setError('');
        } else {
          setError(data.error || 'Failed to add employee');
        }
      } catch (err) {
        setError('An error occurred while adding the employee');
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Please fill in all fields, including generating a password.');
    }
  };

  const handleDeleteEmployee = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/employees/deleteEmployees${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setEmployees(employees.filter((emp) => emp.id !== id));
        setError('');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete employee');
      }
    } catch (err) {
      setError('An error occurred while deleting the employee');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (userRole !== "manager") {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  return (
    <div className="dashboard">
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
      />
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
            disabled={isLoading}
          />
        </div>

        <div className="form-container">
          <input
            type="text"
            placeholder="Identity (used as username)"
            value={newEmployee.identity}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, identity: e.target.value })
            }
            className="form-input"
            disabled={isLoading}
          />
          <input
            type="text"
            placeholder="Name"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
            className="form-input"
            disabled={isLoading}
          />
          <input
            type="text"
            placeholder="Phone"
            value={newEmployee.phone}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, phone: e.target.value })
            }
            className="form-input"
            disabled={isLoading}
          />
          <input
            type="text"
            placeholder="Location"
            value={newEmployee.location}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, location: e.target.value })
            }
            className="form-input"
            disabled={isLoading}
          />
          <input
            type="date"
            value={newEmployee.joining_date}
            onChange={(e) => setNewEmployee({ ...newEmployee, joining_date: e.target.value })}
            className="form-input"
            disabled={isLoading}
          />
          <select
            value={newEmployee.worker_type}
            onChange={(e) => setNewEmployee({ ...newEmployee, worker_type: e.target.value })}
            className="form-input"
            disabled={isLoading}
          >
            <option value="Driver">Driver</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Maintenance Worker">Maintenance Worker</option>
          </select>

          <button
            onClick={handleGeneratePassword}
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
            disabled={isLoading}
          >
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
                <th>Worker Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.identity}</td>
                  <td>{emp.name}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.location}</td>
                  <td>{emp.joining_date}</td>
                  <td>{emp.worker_type}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteEmployee(emp.identity)}
                      className="delete-btn"
                      disabled={isLoading}
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
