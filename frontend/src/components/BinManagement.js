import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./Sidebar";
import "./css/general.css";

const BinManagementPage = ({ onLogout, userRole }) => {
  const [bins, setBins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newBin, setNewBin] = useState({
    location: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = { name: "Mohamed Mhagne", avatar: "/images/sami.png" };

  useEffect(() => {
    fetchBins();
  }, []);

  const fetchBins = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/bins/getBins", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setBins(data);
      } else {
        setError(data.error || "Failed to fetch bins");
      }
    } catch (err) {
      setError("An error occurred while fetching bins");
    } finally {
      setIsLoading(false);
    }
  };

  if (userRole !== "manager") {
    return <div className="error">Access Denied: Managers Only</div>;
  }

  const filteredBins = bins.filter(
    (bin) =>
      bin.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bin.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bin.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBin = async () => {
    if (newBin.location && newBin.address) {
      const binId = uuidv4().slice(0, 10);
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/bins/addBins", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: binId,
            location: newBin.location,
            address: newBin.address,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setBins([...bins, data]);
          setNewBin({
            location: "",
            address: "",
          });
          setError("");
        } else {
          setError(data.error || "Failed to add bin");
        }
      } catch (err) {
        setError("An error occurred while adding the bin");
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Please fill in all fields (Location and Address) to add a bin.");
    }
  };

  const handleDeleteBin = async (binId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/bins/deleteBins${binId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setBins(bins.filter((b) => b.id !== binId));
        setError("");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to delete bin");
      }
    } catch (err) {
      setError("An error occurred while deleting the bin");
    } finally {
      setIsLoading(false);
    }
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

        {error && <p className="error-message">{error}</p>}
        {isLoading && <p>Loading...</p>}

        <div className="form-container">
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
            onChange={handleInputChange}
            className="form-input"
            disabled={isLoading}
          />
          <input
            type="text"
            name="address"
            placeholder="Address (e.g. A12 Tawfiq Ziad)"
            value={newBin.address}
            onChange={handleInputChange}
            className="form-input"
            disabled={isLoading}
          />
          <button
            onClick={handleAddBin}
            className="download-report-btn"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Bin"}
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Bin ID</th>
                <th>Location</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBins.map((bin) => (
                <tr key={bin.id}>
                  <td>{bin.id}</td>
                  <td>{bin.location}</td>
                  <td>{bin.address}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteBin(bin.id)}
                      className="delete-btn"
                      disabled={isLoading}
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