import React, { useEffect,useState } from 'react';
import MapComponent from './MapComponent';
import PageTemplate from './PageTemplate';
import TableComponent from './TableComponent';
import './css/reset.css';
import './css/layout.css';
import './css/components.css';
import './css/themes.css';
import './css/responsive.css';

const GeneralPage = ({ onLogout, userRole }) => {
  const [selectedBin, setSelectedBin] = useState(null);

<<<<<<<<< Temporary merge branch 1
=========
  // Mock bin data using UUID
>>>>>>>>> Temporary merge branch 2
  const mockBins = [
    {
      id: uuidv4().slice(0, 10),
      status: 'Full',
      capacity: 90,
      time: '20:00',
      date: '15-2-2025',
      route: 'Route A',
      battery: 95,
      lat: 32.700,
      lon: 35.312,
    },
    {
      id: uuidv4().slice(0, 10),
      status: 'Full',
      capacity: 87,
      time: '20:00',
      date: '15-1-2025',
      route: 'Route B',
      battery: 88,
      lat: 32.700,
      lon: 35.319,
    },
    {
      id: uuidv4().slice(0, 10),
      status: 'Full',
      capacity: 85,
      time: '22:30',
      date: '15-1-2025',
      route: 'Route C',
      battery: 94,
      lat: 32.712,
      lon: 35.300,
    },
    {
      id: uuidv4().slice(0, 10),
      status: 'Full',
      capacity: 93,
      time: '19:30',
      date: '15-1-2025',
      route: 'Route D',
      battery: 76,
      lat: 32.6996,
      lon: 35.3035,
    },
    {
      id: uuidv4().slice(0, 10),
      status: 'Full',
      capacity: 88,
      time: '18:30',
      date: '15-1-2025',
      route: 'Route E',
      battery: 78,
      lat: 32.713,
      lon: 35.3100,
    },
  ];

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  const handleSelectBin = (bin) => {
    setSelectedBin(bin);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="general" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <div className="map-container">
          <MapComponent bins={mockBins} selectedBin={selectedBin} />
        </div>
        <div className="table-container">
          <TableComponent bins={mockBins} onSelectBin={handleSelectBin} selectedBin={selectedBin} />
        </div>
      </div>
    </div>
  );
};

export default GeneralPage;