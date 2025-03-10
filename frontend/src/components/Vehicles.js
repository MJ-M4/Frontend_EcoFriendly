import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./css/general.css";

const VehiclesPage = ({ onLogout, userRole }) => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newVehicle, setNewVehicle] = useState({
    type: "Garbage Truck",
    licensePlate: "",
    status: "Available",
    location: "",
    lastMaintenance: "",
  });
  const [updateVehicle, setUpdateVehicle] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = { name: "Mohamed Mhagne", avatar: "/images/sami.png" };

  // Fetch vehicles from backend
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/vehicles/");
      console.log("FETCHED VEHICLES RESPONSE:", response.data);
      setVehicles(response.data);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      alert("Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Filter vehicles by type or license plate
  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Validate license plate on blur
  const handleLicensePlateBlur = () => {
    const licensePlate = newVehicle.licensePlate.trim();
    if (licensePlate && !/^[A-Z0-9-]+$/.test(licensePlate)) {
      alert("License Plate must contain only uppercase letters, numbers, and hyphens.");
      setNewVehicle((prev) => ({ ...prev, licensePlate: "" }));
    }
  };

  // Handle adding a new vehicle
  const handleAddVehicle = async () => {
    const { type, licensePlate, status, location, lastMaintenance } = newVehicle;
    if (!type || !licensePlate.trim() || !status || !location.trim() || !lastMaintenance) {
      alert("Please fill in all fields to add a vehicle.");
      return;
    }
    if (!/^[A-Z0-9-]+$/.test(licensePlate.trim())) {
      alert("License Plate must contain only uppercase letters, numbers, and hyphens.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/vehicles/", {
        type,
        licensePlate: licensePlate.trim(),
        status,
        location,
        lastMaintenance,
      });
      alert(response.data.message || "Vehicle added successfully!");
      fetchVehicles();
      setNewVehicle({
        type: "Garbage Truck",
        licensePlate: "",
        status: "Available",
        location: "",
        lastMaintenance: "",
      });
    } catch (error) {
      alert(error.response?.data?.error || "Error adding vehicle");
      console.error("Error adding vehicle:", error.response?.data || error.message);
    }
  };

  // Handle deleting a vehicle
  const handleDeleteVehicle = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/vehicles/${id}`);
      alert(response.data.message || "Vehicle deleted successfully!");
      fetchVehicles();
    } catch (error) {
      alert(error.response?.data?.error || "Error deleting vehicle");
      console.error("Error deleting vehicle:", error.response?.data || error.message);
    }
  };

  // Handle updating a vehicle
  const handleUpdateVehicle = (vehicle) => {
    setUpdateVehicle(vehicle);
    setModalVisible(true);
  };

  const handleSaveUpdate = async () => {
    if (
      !updateVehicle.status ||
      !updateVehicle.location ||
      !updateVehicle.lastMaintenance
    ) {
      alert("Please fill in all update fields.");
      return;
    }
    try {
      const response = await axios.put(`http://localhost:5000/vehicles/${updateVehicle.id}`, {
        type: updateVehicle.type,
        licensePlate: updateVehicle.licensePlate,
        status: updateVehicle.status,
        location: updateVehicle.location,
        lastMaintenance: updateVehicle.lastMaintenance,
      });
      alert(response.data.message || "Vehicle updated successfully!");
      fetchVehicles();
      setModalVisible(false);
      setUpdateVehicle(null);
    } catch (error) {
      alert(error.response?.data?.error || "Error updating vehicle");
      console.error("Error updating vehicle:", error.response?.data || error.message);
    }
  };

  if (userRole !== "manager") {
    return <div className="error">Access Denied: Managers Only</div>;
  }

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
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search by type or License Plate..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
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
              flex: "1",
            }}
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
            onBlur={handleLicensePlateBlur}
            style={{
              padding: "10px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "1px solid #e0e0e0",
              flex: "1",
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
              flex: "1",
            }}
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
            style={{
              padding: "10px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "1px solid #e0e0e0",
              flex: "1",
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
              flex: "1",
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
            disabled={loading}
          >
            Add Vehicle
          </button>
        </div>

        {/* Vehicles Table */}
        <div className="table-container">
          {loading ? (
            <p>Loading vehicles...</p>
          ) : (
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
                {filteredVehicles.length > 0 ? (
                  filteredVehicles.map((vehicle) => (
                    <tr key={vehicle.id}>
                      <td>{vehicle.id}</td>
                      <td>{vehicle.type}</td>
                      <td>{vehicle.licensePlate}</td>
                      <td>{vehicle.status}</td>
                      <td>{vehicle.location}</td>
                      <td>{vehicle.lastMaintenance}</td>
                      <td>
                        <button
                          onClick={() => handleUpdateVehicle(vehicle)}
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "#3498db",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginRight: "5px",
                          }}
                        >
                          Update
                        </button>
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
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No vehicles found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal for updating vehicle */}
        {modalVisible && updateVehicle && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                width: "400px",
                maxWidth: "90%",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                textAlign: "center",
              }}
            >
              <h3>Update Vehicle {updateVehicle.licensePlate}</h3>
              <select
                value={updateVehicle.status}
                onChange={(e) =>
                  setUpdateVehicle({ ...updateVehicle, status: e.target.value })
                }
                style={{
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  border: "1px solid #e0e0e0",
                  width: "100%",
                }}
              >
                <option value="Available">Available</option>
                <option value="In Use">In Use</option>
                <option value="Under Maintenance">Under Maintenance</option>
              </select>
              <input
                type="text"
                placeholder="Location"
                value={updateVehicle.location}
                onChange={(e) =>
                  setUpdateVehicle({ ...updateVehicle, location: e.target.value })
                }
                style={{
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  border: "1px solid #e0e0e0",
                  width: "100%",
                }}
              />
              <input
                type="date"
                value={updateVehicle.lastMaintenance}
                onChange={(e) =>
                  setUpdateVehicle({
                    ...updateVehicle,
                    lastMaintenance: e.target.value,
                  })
                }
                style={{
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  border: "1px solid #e0e0e0",
                  width: "100%",
                }}
              />
              <div style={{ marginTop: "20px" }}>
                <button
                  onClick={handleSaveUpdate}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#3498db",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => setModalVisible(false)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#ff4d4f",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiclesPage;