import React, { useEffect,useState } from 'react';
import MapComponent from './MapComponent';
import Sidebar from './Sidebar';
import TableComponent from './TableComponent';
import './css/general.css';
import { getBinsApi ,updateBinApi} from './apis'; 


const GeneralPage = ({ onLogout, userRole, user }) => {
  const [bins, setBins] = useState([]);
  const [selectedBin, setSelectedBin] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    let intervalId;
    const fetchBins = async () => {
      try {
        const response = await fetch(getBinsApi);
        const data = await response.json();
        if (data.status === "success") {
          // Filter bins to only include those that are full
          const fullBins = data.bins.filter((bin) => bin.status === "Full");
          setBins(fullBins);
        } else {
          setBins([]);
        }
      } catch (err) {
        console.error("Error fetching bins:", err);
        setBins([]);
      }
    };
    fetchBins();
    intervalId = setInterval(fetchBins, 10000); // Fetch every 10 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

    const handleEmptyBin = async (binId) => {
    try {
      const response = await fetch(updateBinApi(binId), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Empty", capacity: 0 }),
      });

      const data = await response.json();
      if (data.status === "success") {
        setBins((prev) => prev.filter((b) => b.binId !== binId)); // Remove the emptied bin from the state
        alert("Bin emptied successfully!");
      } else {
        throw new Error(data.message || "Failed to update bin");
      }
    } catch (err) {
      console.error("Error updating bin:", err);
      alert("Failed to update bin");
    }
  };

  
  const handleSelectBin = (bin) => {
    setSelectedBin(bin);
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
        activePage="general"
        onLogout={onLogout}
        userRole={userRole}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="content">
        <div className="map-container">
          <MapComponent bins={bins} selectedBin={selectedBin} />
        </div>
        <div className="table-container">
          <TableComponent bins={bins} onSelectBin={handleSelectBin} selectedBin={selectedBin} onEmptyBin={handleEmptyBin} />
        </div>
      </div>
    </div>
  );
};

export default GeneralPage;