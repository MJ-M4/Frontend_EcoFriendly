<<<<<<< HEAD
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/reset.css';
import './css/layout.css';
import './css/components.css';
import './css/themes.css';
import './css/responsive.css';
=======
// src/components/Vehicles.js
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./css/general.css";
>>>>>>> main

const VehiclesPage = ({ onLogout, userRole }) => {
  const initialVehicles = [
    {
      id: 1,
      type: "Garbage Truck",
      licensePlate: "ABC-123",
      status: "Available",
      location: "Tel Aviv",
      lastMaintenance: "2025-02-01",
    },
    {
      id: 2,
      type: "Van",
      licensePlate: "XYZ-789",
      status: "In Use",
      location: "Haifa",
      lastMaintenance: "2025-01-15",
    },
    {
      id: 3,
      type: "Maintenance Vehicle",
      licensePlate: "MNT-456",
      status: "Under Maintenance",
      location: "Nazereth",
      lastMaintenance: "2025-03-01",
    },
  ];

  const [vehicles, setVehicles] = useState(initialVehicles);
  const [searchTerm, setSearchTerm] = useState("");
  const [newVehicle, setNewVehicle] = useState({
<<<<<<< HEAD
    type: 'Garbage Truck',
    licensePlate: '',
    status: 'Available',
    lastMaintenance: '',
=======
    type: "Garbage Truck", // Updated default value
    licensePlate: "",
    status: "Available",
    location: "",
    lastMaintenance: "",
>>>>>>> main
  });

  const user = { name: "Mohamed Mhagne", avatar: "/images/sami.png" };

<<<<<<< HEAD
  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.status.toLowerCase().includes(searchTerm.toLowerCase())
=======
  // Filter vehicles by type or status
  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
>>>>>>> main
  );

  const handleAddVehicle = () => {
<<<<<<< HEAD
    if (newVehicle.type && newVehicle.licensePlate && newVehicle.status && newVehicle.lastMaintenance) {
      const newId = vehicles.length + 1;
      setVehicles([...vehicles, { id: newId, ...newVehicle }]);
      setNewVehicle({ type: 'Garbage Truck', licensePlate: '', status: 'Available', lastMaintenance: '' });
=======
    if (
      newVehicle.type &&
      newVehicle.licensePlate &&
      newVehicle.status &&
      newVehicle.lastMaintenance &&
      newVehicle.location
    ) {
      const newId = vehicles.length + 1; // Simple ID generation
      setVehicles([...vehicles, { id: newId, ...newVehicle }]);
      setNewVehicle({
        type: "Garbage Truck", // Updated default value
        licensePlate: "",
        status: "Available",
        lastMaintenance: "",
        location: "",
      }); // Reset form
>>>>>>> main
    } else {
      alert("Please fill in all fields to add a vehicle.");
    }
  };

  const handleDeleteVehicle = (id) => {
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
  };

  return (
    <div className="dashboard">
      <Sidebar
        user={user}
        activePage="vehicles"
        onLogout={onLogout}
        userRole={userRole}
      />
      <div className="content">
        <h1>Vehicles</h1>
<<<<<<< HEAD
        <div className="form-container">
=======

        {/* Search Box */}
        <div style={{ marginBottom: "20px" }}>
>>>>>>> main
          <input
            type="text"
            placeholder="Search by type or License Plate..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
<<<<<<< HEAD
            className="search-input"
          />
        </div>
        <div className="form-container vehicle-form">
          <select
            value={newVehicle.type}
            onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
            className="form-input"
=======
            style={{
              padding: "10px",
              width: "300px",
              borderRadius: "5px",
              border: "1px solid #e0e0e0",
              fontSize: "1rem",
            }}
          />
        </div>

        {/* Add Vehicle Form */}
        <div style={{ marginBottom: "20px" }}>
          <select
            value={newVehicle.type}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, type: e.target.value })
            }
            style={{
              padding: "10px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "1px solid #e0e0e0",
            }}
>>>>>>> main
          >
            <option value="Garbage Truck">Garbage Truck</option>
            <option value="Van">Van</option>
            <option value="Maintenance Vehicle">Maintenance Vehicle</option>
            <option value="Electric Vehicle">Electric Vehicle</option>
            <option value="Sweeper Vehicle">Sweeper Vehicle</option>
            <option value="Recycling Truck">Recycling Truck</option>
            <option value="Utility Vehicle">Utility Vehicle</option>
            <option value="Compactor Truck">Compactor Truck</option>
            <option value="Skip Truck">Skip Truck</option>
            <option value="Water Tanker">Water Tanker</option>
            <option value="Mini Truck">Mini Truck</option>
          </select>
          <input
            type="text"
            placeholder="License Plate"
            value={newVehicle.licensePlate}
<<<<<<< HEAD
            onChange={(e) => setNewVehicle({ ...newVehicle, licensePlate: e.target.value })}
            className="form-input"
          />
          <select
            value={newVehicle.status}
            onChange={(e) => setNewVehicle({ ...newVehicle, status: e.target.value })}
            className="form-input"
=======
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, licensePlate: e.target.value })
            }
            style={{
              padding: "10px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "1px solid #e0e0e0",
            }}
          />
          <select
            value={newVehicle.status}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, status: e.target.value })
            }
            style={{
              padding: "10px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "1px solid #e0e0e0",
            }}
>>>>>>> main
          >
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
          <input
<<<<<<< HEAD
            type="date"
            value={newVehicle.lastMaintenance}
            onChange={(e) => setNewVehicle({ ...newVehicle, lastMaintenance: e.target.value })}
            className="form-input"
          />
          <button onClick={handleAddVehicle} className="download-report-btn">
=======
            type="text"
            placeholder="Location"
            value={newVehicle.location}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, location: e.target.value })
            }
            style={{
              padding: "10px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "1px solid #e0e0e0",
            }}
          />
          <input
            type="date"
            placeholder="Last Maintenance"
            value={newVehicle.lastMaintenance}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, lastMaintenance: e.target.value })
            }
            style={{
              padding: "10px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "1px solid #e0e0e0",
            }}
          />

          <button
            onClick={handleAddVehicle}
            className="download-report-btn"
            style={{
              padding: "10px 20px",
              height: "40px",
              width: "200px",
              margin: "5px",
            }}
          >
>>>>>>> main
            Add Vehicle
          </button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Vehicle ID</th>
                <th>Type</th>
                <th>License Plate</th>
                <th>Status</th>
                <th>Location</th>
                <th>Last Maintenance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.id}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.licensePlate}</td>
                  <td>{vehicle.status}</td>
                  <td>{vehicle.location}</td>
                  <td>{vehicle.lastMaintenance}</td>
                  <td>
<<<<<<< HEAD
                    <button onClick={() => handleDeleteVehicle(vehicle.id)} className="action-btn delete">
=======
                    <button
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#ff4d4f",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
>>>>>>> main
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

export default VehiclesPage;
