import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./Sidebar";
import "./css/general.css";

const HardwareExamination = ({ onLogout, userRole }) => {
  // We store the actual UUID in "id" and remove hardwareId from display
  const initialHardware = [
    {
      id: uuidv4().slice(0, 10),
      binId: uuidv4().slice(0, 10), // if you also want binId as a UUID
      status: "Operational",
      battery: 95,
      lastChecked: "2025-03-01",
      location: "Nazareth",
      address: "A12 Tawfiq Ziad",
    },
    {
      id: uuidv4().slice(0, 10),
      binId: uuidv4().slice(0, 10),
      status: "Needs Maintenance",
      battery: 20,
      lastChecked: "2025-03-02",
      location: "Nazareth",
      address: "45B Some Street",
    },
  ];

  const [hardware, setHardware] = useState(initialHardware);
  const [searchTerm, setSearchTerm] = useState("");
  const [newHardware, setNewHardware] = useState({
    binId: "",
    address: "",
  });

  const user = { name: "Mohamed Mhagne", avatar: "/images/sami.png" };

  if (userRole !== "manager") {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  // Filter hardware by binId, location, or address
  const filteredHardware = hardware.filter(
    (hw) =>
      hw.binId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hw.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hw.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mark as maintained
  const handleMarkAsMaintained = (uuid) => {
    const currentDate = new Date().toISOString().split("T")[0];
    setHardware(
      hardware.map((hw) =>
        hw.id === uuid
          ? { ...hw, status: "Operational", battery: 100, lastChecked: currentDate }
          : hw
      )
    );
  };

  // Add new hardware (the "id" is the real UUID we display)
  const handleAddHardware = () => {
    if (newHardware.binId && newHardware.address) {
      setHardware([
        ...hardware,
        {
          id: uuidv4(),
          binId: newHardware.binId,
          address: newHardware.address,
          status: "Operational",
          battery: 100,
          lastChecked: new Date().toISOString().split("T")[0],
          location: "Unknown",
        },
      ]);
      setNewHardware({ binId: "", address: "" });
    } else {
      alert("Please fill in Bin ID and Address to add hardware.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHardware((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="dashboard">
      <Sidebar
        user={user}
        activePage="hardware-examination"
        onLogout={onLogout}
        userRole={userRole}
      />
      <div className="content">
        <h1>Hardware Examination</h1>

        {/* Search */}
        <div className="form-container">
          <input
            type="text"
            placeholder="Search by bin ID, location, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Add Hardware */}
        <div className="form-container">
          <input
            type="text"
            name="binId"
            placeholder="Bin UUID"
            value={newHardware.binId}
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={newHardware.address}
            onChange={handleInputChange}
            className="form-input"
          />
          <button onClick={handleAddHardware} className="download-report-btn">
            Add Hardware
          </button>
        </div>

        {/* Hardware Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Hardware ID</th>
                <th>Bin ID</th>
                <th>Location</th>
                <th>Address</th>
                <th>Status</th>
                <th>Battery</th>
                <th>Last Checked</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHardware.map((hw) => (
                <tr key={hw.id}>
                  <td>{hw.id}</td>
                  <td>{hw.binId}</td>
                  <td>{hw.location}</td>
                  <td>{hw.address}</td>
                  <td>{hw.status}</td>
                  <td>{hw.battery}%</td>
                  <td>{hw.lastChecked}</td>
                  <td>
                    {hw.status === "Needs Maintenance" && (
                      <button
                        onClick={() => handleMarkAsMaintained(hw.id)}
                        className="mark-maintained-btn"
                      >
                        Mark as Maintained
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Removed the Download File button */}
      </div>
    </div>
  );
};

export default HardwareExamination;