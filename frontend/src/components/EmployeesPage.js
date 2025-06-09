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
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, identity: e.target.value })
            }
            className="form-input"
          />
          <input
            type="text"
            placeholder="Name"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
            className="form-input"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newEmployee.phone}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, phone: e.target.value })
            }
            className="form-input"
          />
          <input
            type="text"
            placeholder="Location"
            value={newEmployee.location}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, location: e.target.value })
            }
            className="form-input"
          />
          <input
            type="date"
            value={newEmployee.joining_date}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, joining_date: e.target.value })
            }
            className="form-input"
          />
          <select
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
            value={newEmployee.role}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, role: e.target.value })
            }
            className="form-input"
          >
            <option value="worker">Worker</option>
            <option value="manager">Manager</option>
          </select>

          <button
            onClick={handleGeneratePassword}
            className="generate-password-btn"
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

          <button onClick={handleAddEmployee} className="btn">
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