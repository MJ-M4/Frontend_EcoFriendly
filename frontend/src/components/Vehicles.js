// src/components/VehiclesPage.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./css/general.css";

const VehiclesPage = ({ onLogout, userRole, userName }) => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  // State for new vehicle form
  const [newVehicle, setNewVehicle] = useState({
    type: "Garbage Truck",
    licensePlate: "",
    status: "Available",
    location: "",
    lastMaintenance: "",
  });

  // Only managers can see this page
  if (userRole !== "manager") {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  // Fetch all vehicles from backend
  const fetchVehicles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/vehicles");
      setVehicles(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch vehicles");
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []); // run once

  const handleAddVehicle = async () => {
    // Validate fields
    if (
      !newVehicle.type ||
      !newVehicle.licensePlate ||
      !newVehicle.status ||
      !newVehicle.location ||
      !newVehicle.lastMaintenance
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/vehicles", {
        type: newVehicle.type,
        license_plate: newVehicle.licensePlate,
        status: newVehicle.status,
        location: newVehicle.location,
        last_maintenance: newVehicle.lastMaintenance,
      });
      // Refresh list
      fetchVehicles();
      // Reset form
      setNewVehicle({
        type: "Garbage Truck",
        licensePlate: "",
        status: "Available",
        location: "",
        lastMaintenance: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add vehicle");
    }
  };

  const handleDeleteVehicle = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/vehicles/${id}`);
      setVehicles(vehicles.filter((v) => v.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete vehicle");
    }
  };

  // Filter for search
  const filteredVehicles = vehicles.filter((v) =>
    v.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.license_plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <Sidebar
        activePage="vehicles"
        onLogout={onLogout}
        userRole={userRole}
        userName={userName}
      />
      <div className="content">
        <h1>Vehicles</h1>
        {error && <p className="error">{error}</p>}

        <div className="form-container">
          <input
            type="text"
            placeholder="Search by type or license plate..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="form-container">
          {/* Type */}
          <select
            value={newVehicle.type}
            onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
            className="form-input"
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

          {/* License Plate */}
          <input
            type="text"
            placeholder="License Plate"
            value={newVehicle.licensePlate}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, licensePlate: e.target.value })
            }
            className="form-input"
          />

          {/* Status */}
          <select
            value={newVehicle.status}
            onChange={(e) => setNewVehicle({ ...newVehicle, status: e.target.value })}
            className="form-input"
          >
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>

          {/* Location */}
          <input
            type="text"
            placeholder="Location"
            value={newVehicle.location}
            onChange={(e) => setNewVehicle({ ...newVehicle, location: e.target.value })}
            className="form-input"
          />

          {/* Last Maintenance */}
          <input
            type="date"
            value={newVehicle.lastMaintenance}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, lastMaintenance: e.target.value })
            }
            className="form-input"
          />

          {/* Add Button */}
          <button onClick={handleAddVehicle} className="download-report-btn">
            Add Vehicle
          </button>
        </div>

        {/* Vehicles Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>License Plate</th>
                <th>Type</th>
                <th>Status</th>
                <th>Location</th>
                <th>Last Maintenance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.license_plate}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.status}</td>
                  <td>{vehicle.location}</td>
                  <td>{vehicle.last_maintenance}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteVehicle(vehicle.id)}
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

export default VehiclesPage;
