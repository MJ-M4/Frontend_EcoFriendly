import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./css/hardware-examination.css";

const HardwareExamination = ({ onLogout, userRole, user }) => {
  const [hardware, setHardware] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newHardware, setNewHardware] = useState({ binId: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch hardware list from backend
  const fetchHardware = () => {
    setIsLoading(true);
    fetch("http://localhost:5005/local/getHardware")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") setHardware(data.hardware);
        else setHardware([]);
      })
      .catch(() => setHardware([]))
      .finally(() => setIsLoading(false));
  };

  // Auto-refresh every 10 seconds
  useEffect(() => {
    fetchHardware();
    const interval = setInterval(fetchHardware, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredHardware = hardware.filter(
    (hw) =>
      hw.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (hw.binId && hw.binId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Add hardware (allowed for everyone)
  const handleAddHardware = () => {
    if (!newHardware.binId) return alert("Please fill in Bin ID.");
    fetch("http://localhost:5005/local/addHardware", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        binId: newHardware.binId,
        status: "Operational",
        battery: 100,
        lastChecked: new Date().toISOString().split("T")[0],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setNewHardware({ binId: "" });
          fetchHardware();
        } else {
          alert(data.message || "Failed to add hardware.");
        }
      });
  };

  // Delete hardware by id
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this hardware?")) return;
    fetch(`http://localhost:5005/local/deleteHardware/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") fetchHardware();
        else alert(data.message || "Failed to delete hardware.");
      });
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

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
            placeholder="Search by Hardware ID or Bin ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="form-container">
          <input
            type="text"
            name="binId"
            placeholder="Bin ID"
            value={newHardware.binId}
            onChange={(e) =>
              setNewHardware((prev) => ({
                ...prev,
                binId: e.target.value,
              }))
            }
            className="form-input"
          />
          <button onClick={handleAddHardware} className="btn">
            Add Hardware
          </button>
        </div>
        <div className="table-container">
          {isLoading ? (
            <div>Loading hardware...</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Hardware ID</th>
                  <th>Bin ID</th>
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
                    <td data-label="Status">
                      {parseFloat(hw.battery) < 40 ? (
                        <span style={{ color: "red", fontWeight: "bold" }}>Needs Maintenance</span>
                      ) : (
                        <span>Operational</span>
                      )}
                    </td>
                    <td data-label="Battery">
                      {hw.battery}%
                    </td>
                    <td data-label="Last Checked">{hw.lastChecked}</td>
                    <td data-label="Actions">
                      <button
                        onClick={() => handleDelete(hw.id)}
                        className="btn"
                        style={{ backgroundColor: "#e74c3c", color: "#fff" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default HardwareExamination;
