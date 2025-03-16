import React from 'react';
import { FaTrash } from 'react-icons/fa';
import wazeIcon from '../Photos/Waze.jpeg'; // confirm path if needed

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
    <table>
      <thead>
        <tr>
          <th>ID</th>
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
          >
            <td>{bin.id}</td>
            <td>
              {getStatusIcon(bin.status)}
              {bin.status}
            </td>
            <td>{bin.capacity}%</td>
            <td>{bin.time}</td>
            <td>{bin.date}</td>
            <td>
              <a
                href={`https://waze.com/ul?ll=${bin.lat},${bin.lon}&navigate=yes`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline', color: '#3498db', display: 'flex', alignItems: 'center' }}
              >
                <img
                  src={wazeIcon}
                  alt="Navigate with Waze"
                  style={{ width: '24px', height: '24px', marginRight: '8px' }}
                />
              </a>
            </td>
            <td>
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
  );
};

export default TableComponent;
