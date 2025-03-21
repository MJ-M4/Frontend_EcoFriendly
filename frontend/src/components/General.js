import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MapComponent from './MapComponent';
import Sidebar from './Sidebar';
import TableComponent from './TableComponent';
import './css/general.css';

const GeneralPage = ({ onLogout, userRole }) => {
  const [selectedBin, setSelectedBin] = useState(null);

  // Mock bin data using UUID
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