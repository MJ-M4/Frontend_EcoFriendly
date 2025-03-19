import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 for unique IDs
import "./css/general.css";
import Sidebar from "./Sidebar";

const VehiclesPage = ({ onLogout, userRole }) => {
  // Mock vehicles data with unique IDs
  const initialVehicles = [
    {
      id: uuidv4(), // Generate unique ID
      type: "Garbage Truck",
      licensePlate: "0000001",
      status: "Available",
      location: "Nazareth",
      lastMaintenance: "2025-02-01",
    },
    {
      id: uuidv4(),
      type: "Van",
      licensePlate: "0000002",
      status: "In Use",
      location: "Nazareth",
      lastMaintenance: "2025-01-15",
    },
    {
      id: uuidv4(),
      type: "Maintenance Vehicle",
      licensePlate: "0000003",
      status: "Under Maintenance",
      location: "Nazareth",
      lastMaintenance: "2025-03-01",
    },
  ];

  const [vehicles, setVehicles] = useState(initialVehicles);
  const [searchTerm, setSearchTerm] = useState("");
  const [newVehicle, setNewVehicle] = useState({
    id: uuidv4(), // Generate unique ID for new vehicle
    type: "Garbage Truck",
    licensePlate: "",
    status: "Available",
    location: "",
    lastMaintenance: "",
  });

  const user = { name: "Mohamed Mhagne", avatar: "/images/sami.png" };

  if (userRole !== "manager") {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  // Filter vehicles by type OR licensePlate
  const filteredVehicles = vehicles.filter(
    (v) =>
      v.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddVehicle = () => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const maintenanceDate = new Date(newVehicle.lastMaintenance);

    // Validation
    if (
      !newVehicle.type ||
      !newVehicle.licensePlate ||
      !newVehicle.status ||
      !newVehicle.location ||
      !newVehicle.lastMaintenance
    ) {
      alert("Please fill in all fields.");
      return;
    }
    if (maintenanceDate > new Date()) {
      alert("Last Maintenance date cannot be in the future.");
      return;
    }
    if (vehicles.some((v) => v.licensePlate === newVehicle.licensePlate)) {
      alert("License Plate already exists. Please use a unique license plate.");
      return;
    }

    // Add new vehicle to state
    setVehicles([...vehicles, newVehicle]);

    // Reset newVehicle state with a new ID
    setNewVehicle({
      id: uuidv4(),
      type: "Garbage Truck",
      licensePlate: "",
      status: "Available",
      location: "",
      lastMaintenance: "",
    });
  };

  const handleDeleteVehicle = (id) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
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

        {/* Search Box */}
        <div className="form-container">
          <input
            type="text"
            placeholder="Search by type or license plate..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Add Vehicle Form */}
        <div className="form-container">
          <select
            value={newVehicle.type}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, type: e.target.value })
            }
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
          <input
            type="text"
            placeholder="License Plate"
            value={newVehicle.licensePlate}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, licensePlate: e.target.value })
            }
            className="form-input"
          />
          <select
            value={newVehicle.status}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, status: e.target.value })
            }
            className="form-input"
          >
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
          <input
            type="text"
            placeholder="Location"
            value={newVehicle.location}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, location: e.target.value })
            }
            className="form-input"
          />
          <input
            type="date"
            value={newVehicle.lastMaintenance}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, lastMaintenance: e.target.value })
            }
            className="form-input"
          />
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
                  <td>{vehicle.licensePlate}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.status}</td>
                  <td>{vehicle.location}</td>
                  <td>{vehicle.lastMaintenance}</td>
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