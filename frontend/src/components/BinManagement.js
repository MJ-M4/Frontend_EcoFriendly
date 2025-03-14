import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./Sidebar";
import "./css/general.css";

const BinManagementPage = ({ onLogout, userRole }) => {
  // Each bin uses a random UUID for binId
  const initialBins = [
    {
      id: uuidv4().slice(0, 10), // internal "id" used for row keys
      binId: uuidv4().slice(0, 10), // the "binId" is now a true UUID
      location: "Tel Aviv",
      address: "A12 Tawfiq Ziad",
      status: "Full",
    },
    {
      id: uuidv4().slice(0, 10),
      binId: uuidv4().slice(0, 10),
      location: "Jerusalem",
      address: "45B Some Street",
      status: "Full",
    },
    {
      id: uuidv4().slice(0, 10),
      binId: uuidv4().slice(0, 10),
      location: "Haifa",
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

  const user = { name: "Mohamed Mhagne", avatar: "/images/sami.png" };

  if (userRole !== "manager") {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  // Filter bins
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
          id: uuidv4().slice(0, 10), // row key
          binId: uuidv4().slice(0, 10), // new random binId
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

  return (
    <div className="dashboard">
      <Sidebar
        user={user}
        activePage="bin-management"
        onLogout={onLogout}
        userRole={userRole}
      />
      <div className="content">
        <h1>Bin Management</h1>

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

        {/* Add Bin */}
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
          <button onClick={handleAddBin} className="download-report-btn">
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
                  <td>{bin.binId}</td>
                  <td>{bin.location}</td>
                  <td>{bin.address}</td>
                  <td>{bin.status}</td>
                  <td>
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