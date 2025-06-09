import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const BinManagementPage = ({ onLogout, userRole, user }) => {
  const [bins, setBins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
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
  }, []);

  const filteredBins = bins.filter(
    (bin) =>
      bin.binId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bin.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bin.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [newBin, setNewBin] = useState({
    location: "",
    address: "",
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
        body: JSON.stringify({ location: newBin.location,
        address: newBin.address,
        status: newBin.status }),
      });

      if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
      const data = await response.json();

      if (data.status === "success") {
        setBins((prev) => [...prev, data.bin]);
        setNewBin({ location: "", address: "", status: "Empty" });
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
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="content">
        <h1>Bin Management</h1>

        {isLoading && <div className="loading">Loading...</div>}

        <div className="search-container">
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
            onChange={(e) => setNewBin({ ...newBin, location: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            name="address"
            placeholder="Address (e.g. A12 Tawfiq Ziad)"
            value={newBin.address}
            onChange={(e) => setNewBin({ ...newBin, address: e.target.value })}
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
                <tr key={bin.binId}>
                  <td data-label="Bin ID">{bin.binId}</td>
                  <td data-label="Location">{bin.location}</td>
                  <td data-label="Address">{bin.address}</td>
                  <td data-label="Status">{bin.status}</td>
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
      </div>
    </div>
  );
};

export default BinManagementPage;
