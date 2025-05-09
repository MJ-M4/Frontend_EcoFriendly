import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./Sidebar";
import "./css/bin-management.css";

const BinManagementPage = ({ onLogout, userRole }) => {
  const initialBins = [
    {
      id: uuidv4().slice(0, 10), 
      binId: uuidv4().slice(0, 10), 
      location: "Nazareth",
      address: "A12 Tawfiq Ziad",
      status: "Full",
    },
    {
      id: uuidv4().slice(0, 10),
      binId: uuidv4().slice(0, 10),
      location: "Nazareth",
      address: "45B Some Street",
      status: "Full",
    },
    {
      id: uuidv4().slice(0, 10),
      binId: uuidv4().slice(0, 10),
      location: "Nazareth",
      address: "78C Another Ave",
      status: "Full",
    },
  ];

  const [bins, setBins] = useState(initialBins);
  const [searchTerm, setSearchTerm] = useState("");
  const [newBin, setNewBin] = useState({
    location: "",
    address: "",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = { name: "Mohamed Mhagne", avatar: "/images/sami.png" };

  if (userRole !== "manager") {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  const filteredBins = bins.filter(
    (bin) =>
      bin.binId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bin.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bin.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBin = () => {
    if (newBin.location && newBin.address) {
      setBins([
        ...bins,
        {
          id: uuidv4().slice(0, 10),
          binId: uuidv4().slice(0, 10),
          location: newBin.location,
          address: newBin.address,
          status: "Empty",
        },
      ]);
      setNewBin({
        location: "",
        address: "",
      });
    } else {
      alert("Please fill in all fields (Location and Address) to add a bin.");
    }
  };

  const handleDeleteBin = (rowId) => {
    setBins(bins.filter((b) => b.id !== rowId));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBin((prev) => ({ ...prev, [name]: value }));
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
        activePage="bin-management"
        onLogout={onLogout}
        userRole={userRole}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="content">
        <h1>Bin Management</h1>

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
            name="location"
            placeholder="Location"
            value={newBin.location}
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="text"
            name="address"
            placeholder="Address (e.g. A12 Tawfiq Ziad)"
            value={newBin.address}
            onChange={handleInputChange}
            className="form-input"
          />
          <button onClick={handleAddBin} className="add-bin-btn">
            Add Bin
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Bin ID</th>
                <th>Location</th>
                <th>Address</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBins.map((bin) => (
                <tr key={bin.id}>
                  <td data-label="Bin ID">{bin.binId}</td>
                  <td data-label="Location">{bin.location}</td>
                  <td data-label="Address">{bin.address}</td>
                  <td data-label="Status">{bin.status}</td>
                  <td data-label="Actions">
                    <button
                      onClick={() => handleDeleteBin(bin.id)}
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

export default BinManagementPage;