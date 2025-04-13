import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./css/general.css";

const VehiclesPage = ({ onLogout, userRole }) => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newVehicle, setNewVehicle] = useState({
    type: "Garbage Truck",
    license_plate: "",  // Changed to snake_case
    status: "Available",
    location: "",       // Keep if adding to backend, remove otherwise
    last_maintenance: "" // Changed to snake_case
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = { name: "Mohamed Mhagne", avatar: "/images/sami.png" };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/vehicles/getVehicles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setVehicles(data);
      } else {
        setError(data.error || "Failed to fetch vehicles");
      }
    } catch (err) {
      setError("An error occurred while fetching vehicles");
    } finally {
      setIsLoading(false);
    }
  };

  if (userRole !== "manager") {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.license_plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddVehicle = async () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const maintenanceDate = new Date(newVehicle.last_maintenance);

    if (
      !newVehicle.type ||
      !newVehicle.license_plate ||
      !newVehicle.status ||
      !newVehicle.last_maintenance
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (maintenanceDate > new Date()) {
      setError("Last Maintenance date cannot be in the future.");
      return;
    }
    if (vehicles.some((v) => v.license_plate === newVehicle.license_plate)) {
      setError("License Plate already exists. Please use a unique license plate.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/vehicles/addVehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: newVehicle.type,
          license_plate: newVehicle.license_plate,
          status: newVehicle.status,
          last_maintenance: newVehicle.last_maintenance,
          location: newVehicle.location  // Include if added to backend
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setVehicles([...vehicles, data]);
        setNewVehicle({
          type: "Garbage Truck",
          license_plate: "",
          status: "Available",
          location: "",
          last_maintenance: ""
        });
        setError("");
      } else {
        setError(data.error || "Failed to add vehicle");
      }
    } catch (err) {
      setError("An error occurred while adding the vehicle");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/vehicles/deleteVehicles${vehicleId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setVehicles(vehicles.filter((v) => v.id !== vehicleId));
        setError("");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to delete vehicle");
      }
    } catch (err) {
      setError("An error occurred while deleting the vehicle");
    } finally {
      setIsLoading(false);
    }
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

        {error && <p className="error-message">{error}</p>}
        {isLoading && <p>Loading...</p>}

        <div className="form-container">
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
          <select
            value={newVehicle.type}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, type: e.target.value })
            }
            className="form-input"
            disabled={isLoading}
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
            value={newVehicle.license_plate}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, license_plate: e.target.value })
            }
            className="form-input"
            disabled={isLoading}
          />
          <select
            value={newVehicle.status}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, status: e.target.value })
            }
            className="form-input"
            disabled={isLoading}
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
            disabled={isLoading}
          />
          <input
            type="date"
            value={newVehicle.last_maintenance}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, last_maintenance: e.target.value })
            }
            className="form-input"
            disabled={isLoading}
          />
          <button
            onClick={handleAddVehicle}
            className="download-report-btn"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Vehicle"}
          </button>
        </div>

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
                  <td>{vehicle.location || "N/A"}</td> {/* Handle missing location */}
                  <td>{vehicle.last_maintenance || "N/A"}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteVehicle(vehicle.id)}
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

export default VehiclesPage;