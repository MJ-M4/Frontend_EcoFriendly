import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MapComponent from './MapComponent';
import PageTemplate from './PageTemplate';
import TableComponent from './TableComponent';

const GeneralPage = ({ onLogout, userRole, userName }) => {
  const [selectedBin, setSelectedBin] = useState(null);

  const mockBins = [
    { id: uuidv4().slice(0, 10), status: 'Full', capacity: 90, time: '20:00', date: '15-2-2025', route: 'Route A', battery: 95, lat: 32.700, lon: 35.312 },
    { id: uuidv4().slice(0, 10), status: 'Full', capacity: 87, time: '20:00', date: '15-1-2025', route: 'Route B', battery: 88, lat: 32.700, lon: 35.319 },
  ];

  const handleSelectBin = (bin) => {
    setSelectedBin(bin);
  };

  return (
    <PageTemplate title="General" onLogout={onLogout} userRole={userRole} userName={userName} activePage="general">
      <div className="map-container">
        <MapComponent bins={mockBins} selectedBin={selectedBin} />
      </div>
      <div className="table-container">
        <TableComponent bins={mockBins} onSelectBin={handleSelectBin} selectedBin={selectedBin} />
      </div>
    </PageTemplate>
  );
};

export default GeneralPage;