import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MapComponent from './MapComponent';
import Sidebar from './Sidebar';
import TableComponent from './TableComponent';
import './css/reset.css';
import './css/layout.css';
import './css/components.css';
import './css/themes.css';
import './css/responsive.css';

const GeneralPage = ({ onLogout, userRole }) => {
  const [selectedBin, setSelectedBin] = useState(null);

<<<<<<< HEAD
=======
  // Mock bin data using UUID
>>>>>>> main
  const mockBins = [
    {
      id: uuidv4().slice(0, 10),
      status: 'Full',
      capacity: 90,
      time: '20:00',
      date: '15-1-2025',
      route: 'Route A',
      battery: 95,
      lat: 31.771959,
      lon: 35.217018,
    },
    {
      id: uuidv4().slice(0, 10),
      status: 'Full',
      capacity: 87,
      time: '20:00',
      date: '15-1-2025',
      route: 'Route B',
      battery: 88,
      lat: 31.772,
      lon: 35.218,
    },
    {
      id: uuidv4().slice(0, 10),
      status: 'Full',
      capacity: 30,
      time: '22:30',
      date: '15-1-2025',
      route: 'Route C',
      battery: 94,
      lat: 31.773,
      lon: 35.219,
    },
    {
      id: uuidv4().slice(0, 10),
      status: 'Full',
      capacity: 40,
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
      capacity: 50,
      time: '18:30',
      date: '15-1-2025',
      route: 'Route E',
      battery: 78,
      lat: 32.712,
      lon: 35.3245,
    },
  ];

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  const handleSelectBin = (bin) => {
    setSelectedBin(bin);
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
