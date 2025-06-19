<<<<<<< HEAD
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";


const VehiclesPage = ({ onLogout, userRole, user }) => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
=======
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
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
  const [newVehicle, setNewVehicle] = useState({
    type: "Garbage Truck",
    licensePlate: "",
    status: "Available",
    location: "",
    lastMaintenance: "",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

<<<<<<< HEAD
  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5005/local/getVehicles");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "success") {
          const vehiclesData = Array.isArray(data.vehicles)
            ? data.vehicles
            : [];
          setVehicles(vehiclesData);
        } else {
          throw new Error(data.message || "Failed to fetch vehicles");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
        setVehicles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleAddVehicle = async () => {
    if (!newVehicle.licensePlate || !newVehicle.location) {
      setError("License plate and location are required");
=======
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
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
      return;
    }

    try {
<<<<<<< HEAD
      setIsLoading(true);
      const response = await fetch("http://localhost:5005/local/addVehicle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVehicle),
      });

      const data = await response.json();
      console.log("API Response:", data);
      if (data.status === "success") {
        setVehicles((prev) => [...prev, data.vehicle]);
        alert("Vehicle added successfully");
        setNewVehicle({
          type: "Garbage Truck",
          licensePlate: "",
          status: "Available",
          location: "",
          lastMaintenance: "",
        });
        setError(null);
      } else {
        throw new Error(data.message || "Failed to add vehicle");
      }
    } catch (error) {
      console.error("Add error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteVehicle = async (licensePlate) => {
    if (!confirm(`Delete vehicle ${licensePlate}?`)) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5005/local/deleteVehicle/${licensePlate}`,
        { method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        setVehicles((prev) =>
          prev.filter((v) => v.licensePlate !== licensePlate)
        );
        alert("Vehicle deleted successfully");
      } else {
        throw new Error(data.message || "Failed to delete vehicle");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredVehicles = vehicles
    .filter((v) => v) // إزالة العناصر الفارغة
    .filter((v) => {
      const search = searchTerm.toLowerCase();
      return (
        v.type?.toLowerCase().includes(search) ||
        false ||
        v.licensePlate?.toLowerCase().includes(search) ||
        false
      );
    });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
=======
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
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
  };

  // Filter for search
  const filteredVehicles = vehicles.filter((v) =>
    v.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.license_plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        disabled={isLoading}
      >
        {isSidebarOpen ? "✖" : "☰"}
      </button>
      <Sidebar
        activePage="vehicles"
        onLogout={onLogout}
        userRole={userRole}
<<<<<<< HEAD
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="content">
        <h1>Vehicles</h1>
        <div className="search-container">
=======
        userName={userName}
      />
      <div className="content">
        <h1>Vehicles</h1>
        {error && <p className="error">{error}</p>}

        <div className="form-container">
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
          <input
            type="text"
            placeholder="Search by type or license plate..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            disabled={isLoading}
          />
        </div>

        <div className="form-container">
<<<<<<< HEAD
          <select
            value={newVehicle.type}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, type: e.target.value })
            }
=======
          {/* Type */}
          <select
            value={newVehicle.type}
            onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
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
<<<<<<< HEAD
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, status: e.target.value })
            }
=======
            onChange={(e) => setNewVehicle({ ...newVehicle, status: e.target.value })}
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
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
<<<<<<< HEAD
          <button
            onClick={handleAddVehicle}
            disabled={isLoading}
            className="btn"
          >
            {isLoading ? "Adding..." : "Add Vehicle"}
          </button>
        </div>

=======

          {/* Add Button */}
          <button onClick={handleAddVehicle} className="download-report-btn">
            Add Vehicle
          </button>
        </div>

        {/* Vehicles Table */}
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
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
<<<<<<< HEAD
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.licensePlate}>
                    <td data-label="License Plate">{vehicle.licensePlate}</td>
                    <td data-label="Type">{vehicle.type}</td>
                    <td data-label="Status">{vehicle.status}</td>
                    <td data-label="Location">{vehicle.location}</td>
                    <td data-label="Last Maintenance">
                      {vehicle.lastMaintenance}
                    </td>
                    <td data-label="Actions">
                      <button
                        onClick={() =>
                          handleDeleteVehicle(vehicle.licensePlate)
                        }
                        disabled={isLoading}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    {vehicles.length === 0
                      ? "No vehicles available"
                      : "No matching vehicles found"}
=======
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
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VehiclesPage;
