import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./Sidebar";
import "./css/general.css";

const BinManagementPage = ({ onLogout, userRole }) => {
  // Mock bin data with house number
  const initialBins = [
    { id: 'bin_1', location: 'Tel Aviv', houseNumber: '12A', status: 'Full', assignedWorker: 'Worker 1' },
    { id: 'bin_2', location: 'Jerusalem', houseNumber: '45B', status: 'Full', assignedWorker: 'Unassigned' },
    { id: 'bin_3', location: 'Haifa', houseNumber: '78C', status: 'Full', assignedWorker: 'Worker 3' },
    { id: 'bin_4', location: 'Nazareth', houseNumber: '3D', status: 'Full', assignedWorker: 'Unassigned' },
    { id: 'bin_5', location: 'Eilat', houseNumber: '19E', status: 'Full', assignedWorker: 'Worker 2' },
  ];

  // Mock workers data
  const workers = [
    { id: 1, name: 'Worker 1', workerType: 'Driver' },
    { id: 2, name: 'Worker 2', workerType: 'Cleaner' },
    { id: 3, name: 'Worker 3', workerType: 'Maintenance Worker' },
  ];

  const [bins, setBins] = useState(initialBins);
  const [searchTerm, setSearchTerm] = useState("");
  const [newBin, setNewBin] = useState({
    id: '',
    location: '',
    houseNumber: '',
  });

  const user = { name: "Mohamed Mhagne", avatar: "/images/sami.png" };

  // Filter bins by ID, location, house number, or assigned worker
  const filteredBins = bins.filter((bin) =>
    bin.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bin.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bin.houseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bin.assignedWorker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBin = () => {
    if (newBin.id && newBin.location && newBin.houseNumber) {
      setBins([
        ...bins,
        {
          id: uuidv4().slice(0, 10), // row key
          binId: uuidv4().slice(0, 10), // new random binId
          location: newBin.location,
          houseNumber: newBin.houseNumber,
          status: 'Empty', // Default status for new bins
          assignedWorker: 'Unassigned',
        },
      ]);
      setNewBin({ id: '', location: '', houseNumber: '' });
    } else {
      alert('Please fill in all fields (Bin ID, Location, and House Number) to add a bin.');
    }
  };

  const handleDeleteBin = (rowId) => {
    setBins(bins.filter((b) => b.id !== rowId));
  };


  // Handle input change for new bin form
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

        {/* Search Box */}
        <div className="form-container">
          <input
            type="text"
            placeholder="Search by bin ID, location, house number, or assigned worker..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Add Bin Form */}
        <div className="form-container">
          <input
            type="text"
            name="id"
            placeholder="Bin ID"
            value={newBin.id}
            onChange={handleInputChange}
            className="form-input"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newBin.location}
            onChange={handleInputChange}
            className="form-input"
            required
          />
          <input
            type="text"
            name="houseNumber"
            placeholder="House Number"
            value={newBin.houseNumber}
            onChange={handleInputChange}
            className="form-input"
            required
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
                <th>House Number</th> {/* Added House Number column */}
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBins.map((bin) => (
                <tr key={bin.id}>
                  <td>{bin.binId}</td>
                  <td>{bin.location}</td>
                  <td>{bin.houseNumber}</td> {/* Display House Number */}
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


