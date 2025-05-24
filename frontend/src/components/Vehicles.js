import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./css/vehicles.css";

const VehiclesPage = ({ onLogout, userRole, user }) => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newVehicle, setNewVehicle] = useState({
    type: "Garbage Truck",
    licensePlate: "",
    status: "Available",
    location: "",
    lastMaintenance: "",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      return;
    }

    try {
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
        { method: "DELETE" }
      );

      const data = await response.json();
      if (data.status === "success") {
        setVehicles((prev) =>
          prev.filter((v) => v.licensePlate !== licensePlate)
        );
      } else {
        throw new Error(data.message || "Failed to delete");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredVehicles = vehicles
    .filter(v => v) // إزالة العناصر الفارغة
    .filter(v => {
      const search = searchTerm.toLowerCase();
      return (
        (v.type?.toLowerCase().includes(search) || false) ||
        (v.licensePlate?.toLowerCase().includes(search) || false)
      );
    });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
        user={user}
        activePage="vehicles"
        onLogout={onLogout}
        userRole={userRole}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="content">
        <h1>Vehicles</h1>

        {isLoading && <div className="loading">Loading...</div>}
        {error && <div className="error-message">{error}</div>}

        <div className="search-container">
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
          <button onClick={handleAddVehicle} disabled={isLoading} className="add-vehicle-btn">
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

              {filteredVehicles.length > 0 ?(
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
                      onClick={() => handleDeleteVehicle(vehicle.licensePlate)}
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
