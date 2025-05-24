import React from 'react';
import { FaTrash } from 'react-icons/fa';
<<<<<<< HEAD
import wazeIcon from '../Photos/Waze.jpeg'; 
=======
import wazeIcon from '../Photos/Waze.jpeg';
>>>>>>> 68fa09bf9813974cbf1e28028ae9e4abf76402a3

const TableComponent = ({ bins, onSelectBin, selectedBin }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Full':
        return <FaTrash style={{ color: '#ff4d4f', marginRight: '8px' }} />;
      case 'Near Full':
        return <FaTrash style={{ color: '#ffeb3b', marginRight: '8px' }} />;
      case 'Not Full':
        return <FaTrash style={{ color: '#4caf50', marginRight: '8px' }} />;
      default:
        return null;
    }
  };

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Bin ID</th>
            <th>Status</th>
            <th>Capacity</th>
            <th>Event Time</th>
            <th>Date</th>
            <th>Route Suggest</th>
            <th>Battery Level</th>
          </tr>
        </thead>
        <tbody>
          {bins.map((bin) => (
            <tr
              key={bin.id}
              className={selectedBin && selectedBin.id === bin.id ? 'selected' : ''}
              onClick={() => onSelectBin(bin)}
            >
              <td data-label="Bin ID">{bin.id}</td>
              <td data-label="Status">
                {getStatusIcon(bin.status)}
                {bin.status}
              </td>
              <td data-label="Capacity">{bin.capacity}%</td>
              <td data-label="Event Time">{bin.time}</td>
              <td data-label="Date">{bin.date}</td>
              <td data-label="Route Suggest">
                <a
                  href={`https://waze.com/ul?ll=${bin.lat},${bin.lon}&navigate=yes`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="waze-link"
                >
                  <img src={wazeIcon} alt="Navigate with Waze" className="waze-icon" />
                </a>
              </td>
              <td data-label="Battery Level">
                {bin.battery}%{' '}
                <div className="battery-bar">
                  <div
                    className="battery-fill"
                    style={{ width: `${bin.battery}%`, backgroundColor: bin.battery > 50 ? '#4caf50' : '#ff4d4f' }}
                  ></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;