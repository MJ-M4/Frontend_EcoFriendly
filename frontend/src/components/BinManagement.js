<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
import Sidebar from "./Sidebar";

<<<<<<< HEAD
const BinManagementPage = ({ onLogout, userRole, user }) => {
  const [bins, setBins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
=======
const BinManagementPage = ({ onLogout, userRole,userName }) => {
  // Each bin uses a random UUID for binId
  const initialBins = [
    {
      id: uuidv4().slice(0, 10), // internal "id" used for row keys
      binId: uuidv4().slice(0, 10), // the "binId" is now a true UUID
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
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae

  useEffect(() => {
    let intervalId;

<<<<<<< HEAD
    const fetchBins = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5005/local/getBins");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.status === "success") {
          const binsData = Array.isArray(data.bins) ? data.bins : [];
          setBins(binsData);
        } else {
          throw new Error(data.message || "Failed to fetch bins");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setBins([]);
      } finally {
        setIsLoading(false);
      }
    }; 
    fetchBins();
    intervalId = setInterval(fetchBins, 10000); // every 10 seconds
    return () => clearInterval(intervalId); // cleanup
  }, []);

=======
  if (userRole !== "manager") {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  // Filter bins
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
  const filteredBins = bins.filter(
    (bin) =>
      bin.binId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bin.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bin.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [newBin, setNewBin] = useState({
    location: "",
    address: "",
    lat: "",
    lon: "",
    status: "Empty",
  });

  const handleAddBin = async () => {
    if (!newBin.location || !newBin.address) {
      alert("Location and address are required");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5005/local/addBin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: newBin.location,
          address: newBin.address,
          lat: parseFloat(newBin.lat),
          lon: parseFloat(newBin.lon),
          status: newBin.status,
        }),
      });
<<<<<<< HEAD

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.status === "success") {
        setBins((prev) => [...prev, data.bin]);
        setNewBin({
          location: "",
          address: "",
          lat: "",
          lon: "",
          status: "Empty",
        });
        alert("Bin added successfully");
      } else {
        throw new Error(data.message || "Failed to add bin");
      }
    } catch (error) {
      console.error("Error adding bin:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBin = async (binId) => {
    if (!window.confirm("Are you sure you want to delete this bin?")) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5005/local/deleteBin/${binId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        setBins((prev) => prev.filter((bin) => bin.binId !== binId));
        alert("Bin deleted successfully");
      } else {
        throw new Error(data.message || "Failed to delete bin");
      }
    } catch (error) {
      console.error("Error deleting bin:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
=======
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
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
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
        activePage="bin-management"
        onLogout={onLogout}
        userRole={userRole}
<<<<<<< HEAD
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="content">
        <h1>Bin Management</h1>
        <div className="search-container">
=======
        userName={userName}
      />
      <div className="content">
        <h1>Bin Management</h1>

        {/* Search */}
        <div className="form-container">
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
          <input
            type="text"
            placeholder="Search by bin ID, location, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            disabled={isLoading}
          />
        </div>

        <div className="form-container">
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newBin.location}
<<<<<<< HEAD
            onChange={(e) => setNewBin({ ...newBin, location: e.target.value })}
=======
            onChange={handleInputChange}
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
            className="form-input"
          />
          <input
            type="text"
            name="address"
            placeholder="Address (e.g. A12 Tawfiq Ziad)"
            value={newBin.address}
<<<<<<< HEAD
            onChange={(e) => setNewBin({ ...newBin, address: e.target.value })}
=======
            onChange={handleInputChange}
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
            className="form-input"
          />
          <input
            type="text"
            name="lat"
            placeholder="Latitude"
            value={newBin.lat}
            onChange={(e) => setNewBin({ ...newBin, lat: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            name="lon"
            placeholder="Longitude"
            value={newBin.lon}
            onChange={(e) => setNewBin({ ...newBin, lon: e.target.value })}
            className="form-input"
          />
          <select
            value={newBin.status}
            onChange={(e) => setNewBin({ ...newBin, status: e.target.value })}
            className="form-input"
          >
            <option value="Empty">Empty</option>
            <option value="Mid">Mid</option>
            <option value="Full">Full</option>
          </select>

          <button onClick={handleAddBin} className="btn">
            Add Bin
          </button>
        </div>
<<<<<<< HEAD
        {isLoading ? (
          <p>Loading bins...</p>
        ) : filteredBins.length === 0 ? (
          <p>No bins found. you can add bins</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Bin ID</th>
                  <th>Location</th>
                  <th>Address</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Status</th>
                  <th>Capacity</th>
                  <th>Actions</th>
=======

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
>>>>>>> a08a4ce4171da29b4d8a47d1010489f2ba40cfae
                </tr>
              </thead>
              <tbody>
                {filteredBins.map((bin) => (
                  <tr key={bin.binId}>
                    <td data-label="Bin ID">{bin.binId}</td>
                    <td data-label="Location">{bin.location}</td>
                    <td data-label="Address">{bin.address}</td>
                    <td data-label="Latitude">{bin.lat}</td>
                    <td data-label="Longitude">{bin.lon}</td>
                    <td data-label="Status">{bin.status}</td>
                    <td data-label="Capacity">{bin.capacity?.toFixed(1)}%</td>
                    <td data-label="Actions">
                      <button
                        onClick={() => handleDeleteBin(bin.binId)}
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
        )}
      </div>
    </div>
  );
};

export default BinManagementPage;
