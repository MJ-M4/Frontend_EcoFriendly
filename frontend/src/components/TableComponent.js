import { faBatteryEmpty, faBatteryFull, faBatteryHalf, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import wazeIcon from '../Photos/Waze.jpeg';

const TableComponent = ({ bins, onSelectBin, selectedBin }) => {
  // Choose battery icon based on level
  const getBatteryIcon = (battery) => {
    if (battery > 75) return faBatteryFull;
    if (battery > 25) return faBatteryHalf;
    return faBatteryEmpty;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Capacity</th>
          <th>Time</th>
          <th>Date</th>
          <th>Route Suggest</th>
          <th>Battery Level</th>
        </tr>
      </thead>
      <tbody>
        {bins.map(bin => (
          <tr
            key={bin.id}
            onClick={() => onSelectBin(bin)}
            className={selectedBin && selectedBin.id === bin.id ? 'selected' : ''}
          >
            <td>{bin.id}</td>
            <td>
              <div
                style={{
                  backgroundColor: bin.status === 'Full' ? 'red' : bin.status === 'Near Full' ? 'yellow' : 'green',
                  width: '20px',
                  height: '20px',
                  display: 'inline-block',
                  marginRight: '5px',
                }}
              ></div>
              <FontAwesomeIcon icon={faTrash} /> {bin.status}
            </td>
            <td>{bin.capacity}%</td>
            <td>{bin.time}</td>
            <td>{bin.date}</td>
            <td>
            <a
                href={`https://waze.com/ul?ll=${bin.lat},${bin.lon}&navigate=yes`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={wazeIcon}
                  alt="Navigate with Waze"
                  style={{ width: '24px', height: '24px',marginLeft:'60px'}}
                />
              </a>
            </td>
            <td>
              {bin.battery}% <FontAwesomeIcon icon={getBatteryIcon(bin.battery)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;