import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./Sidebar";
import "./css/hardware-examination.css";

const HardwareExamination = ({ onLogout, userRole, user}) => {
  const initialHardware = [
    {
      id: uuidv4().slice(0, 10),
      binId: uuidv4().slice(0, 10), 
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  if (userRole !== "manager") {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  const filteredHardware = hardware.filter(
    (hw) =>
      hw.binId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hw.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hw.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard">
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
        {isSidebarOpen ? '✖' : '☰'}
      </button>
      <Sidebar
        user={user}
        activePage="hardware-examination"
        onLogout={onLogout}
        userRole={userRole}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="content">
        <h1>Hardware Examination</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by bin ID, location, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

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
          <button onClick={handleAddHardware} className="add-hardware-btn">
            Add Hardware
          </button>
        </div>

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
                  <td data-label="Hardware ID">{hw.id}</td>
                  <td data-label="Bin ID">{hw.binId}</td>
                  <td data-label="Location">{hw.location}</td>
                  <td data-label="Address">{hw.address}</td>
                  <td data-label="Status">{hw.status}</td>
                  <td data-label="Battery">{hw.battery}%</td>
                  <td data-label="Last Checked">{hw.lastChecked}</td>
                  <td data-label="Actions">
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
      </div>
    </div>
  );
};

export default HardwareExamination;