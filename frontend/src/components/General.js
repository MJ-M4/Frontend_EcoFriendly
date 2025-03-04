import React, { useState } from 'react';
import MapComponent from './MapComponent';
import Sidebar from './Sidebar';
import TableComponent from './TableComponent';
import './css/general.css';



const Dashboard = () => {
  // State for the selected bin (for map centering)
  const [selectedBin, setSelectedBin] = useState(null);

  // Mock bin data (replace with API data later)
  const mockBins = [
    { id: 'bin_1', status: 'Full', capacity: 90, time: '20:00', date: '15-1-2025', route: 'Route A', battery: 95, lat: 31.771959, lon: 35.217018 },
    { id: 'bin_2', status: 'Full', capacity: 87, time: '20:00', date: '15-1-2025', route: 'Route B', battery: 88, lat: 31.772000, lon: 35.218000 },
    { id: 'bin_3', status: 'Full', capacity: 60, time: '22:30', date: '15-1-2025', route: 'Route C', battery: 94, lat: 31.773000, lon: 35.219000 },
  ];

  // Mock user data
  const user = { name: '123', avatar: 'https://via.placeholder.com/50' };

  // Function to handle bin selection
  const handleSelectBin = (bin) => {
    setSelectedBin(bin);
  };

  return (
    <div className="dashboard">
      <Sidebar user={user} />
      <div className="content">
        <MapComponent bins={mockBins} selectedBin={selectedBin} />
        <TableComponent bins={mockBins} onSelectBin={handleSelectBin} selectedBin={selectedBin} />
      </div>
    </div>
  );
};
export default Dashboard;