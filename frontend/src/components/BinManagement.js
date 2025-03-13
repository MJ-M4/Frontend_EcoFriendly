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
      customerId: "20078787", // Added customerId
      houseNumber: "12", // Added houseNumber
      status: "Full",
      assignedWorker: "Worker 1",
    },
    {
      id: uuidv4().slice(0, 10),
      binId: uuidv4().slice(0, 10),
      location: "Jerusalem",
      address: "45B Some Street",
      customerId: "207702096",
      houseNumber: "45",
      status: "Full",
      assignedWorker: "Unassigned",
    },
    {
      id: uuidv4().slice(0, 10),
      binId: uuidv4().slice(0, 10),
      location: "Haifa",
      address: "78C Another Ave",
      customerId: "20770593",
      houseNumber: "78",
      status: "Full",
      assignedWorker: "Worker 3",
    },
  ];

  const workers = [
    { id: 1, name: "Worker 1", workerType: "Driver" },
    { id: 2, name: "Worker 2", workerType: "Cleaner" },
    { id: 3, name: "Worker 3", workerType: "Maintenance Worker" },
  ];

  const [bins, setBins] = useState(initialBins);
  const [searchTerm, setSearchTerm] = useState("");
  const [newBin, setNewBin] = useState({
    location: "",
    address: "",
    customerId: "", // Added customerId
    houseNumber: "", // Added houseNumber
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
      bin.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bin.assignedWorker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bin.customerId.toLowerCase().includes(searchTerm.toLowerCase()) || // Added customerId to search
      bin.houseNumber.toLowerCase().includes(searchTerm.toLowerCase()) // Added houseNumber to search
  );

  const handleAssignWorker = (rowId, workerName) => {
    setBins(
      bins.map((b) =>
        b.id === rowId ? { ...b, assignedWorker: workerName } : b
      )
    );
  };

  const handleAddBin = () => {
    if (newBin.location && newBin.address && newBin.customerId && newBin.houseNumber) {
      setBins([
        ...bins,
        {
          id: uuidv4().slice(0, 10), // row key
          binId: uuidv4().slice(0, 10), // new random binId
          location: newBin.location,
          address: newBin.address,
          customerId: newBin.customerId,
          houseNumber: newBin.houseNumber,
          status: "Empty",
          assignedWorker: "Unassigned",
        },
      ]);
      setNewBin({
        location: "",
        address: "",
        customerId: "",
        houseNumber: "",
      });
    } else {
      alert("Please fill in all fields (Location, Address, Customer ID, and House Number) to add a bin.");
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
            placeholder="Search by bin ID, location, address, assigned worker, customer ID, or house number..."
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
          <input
            type="text"
            name="customerId"
            placeholder="Customer ID (e.g. 20787876)" // Added field
            value={newBin.customerId}
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="text"
            name="houseNumber"
            placeholder="House Number (e.g. 12)"
            value={newBin.houseNumber}
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
                <th>Customer ID</th> {/* Added column */}
                <th>House Number</th> {/* Added column */}
                <th>Status</th>
                <th>Assigned Worker</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBins.map((bin) => (
                <tr key={bin.id}>
                  <td>{bin.binId}</td>
                  <td>{bin.location}</td>
                  <td>{bin.address}</td>
                  <td>{bin.customerId}</td> {/* Added column data */}
                  <td>{bin.houseNumber}</td> {/* Added column data */}
                  <td>{bin.status}</td>
                  <td>
                    <select
                      value={bin.assignedWorker}
                      onChange={(e) => handleAssignWorker(bin.id, e.target.value)}
                      className="form-input"
                    >
                      <option value="Unassigned">Unassigned</option>
                      {workers.map((worker) => (
                        <option key={worker.id} value={worker.name}>
                          {worker.name} ({worker.workerType})
                        </option>
                      ))}
                    </select>
                  </td>
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