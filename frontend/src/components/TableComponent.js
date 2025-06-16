import React from "react";
import { FaTrash } from "react-icons/fa";
import wazeIcon from "../Photos/Waze.jpeg";

const TableComponent = ({ bins, onSelectBin, selectedBin, onEmptyBin }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "Full":
        return <FaTrash style={{ color: "#ff4d4f", marginRight: "8px" }} />;
      case "Near Full":
        return <FaTrash style={{ color: "#ffeb3b", marginRight: "8px" }} />;
      case "Not Full":
        return <FaTrash style={{ color: "#4caf50", marginRight: "8px" }} />;
      default:
        return null;
    }
  };

  const now = new Date();
  const currentDate = now.toLocaleDateString('en-GB'); 
  const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentBattery = Math.floor(Math.random() * 100); // Simulated battery percentage

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
            <th>Route</th>
            <th>Battery</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bins.map((bin) => (
            <tr
              key={bin.binId}
              className={selectedBin?.binId === bin.binId ? "selected" : ""}
              onClick={() => onSelectBin(bin)}
            >
              <td>{bin.binId}</td>
              <td>{bin.status}</td>
              <td>{bin.capacity}%</td>
              <td>{bin.time || currentTime}</td>
              <td>{bin.date || currentDate}</td>
              <td>
                <a
                  href={`https://waze.com/ul?ll=${bin.lat},${bin.lon}&navigate=yes`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={wazeIcon} alt="Waze" className="waze-icon" />
                </a>
              </td>
              <td>{bin.battery || currentBattery}%</td>
              <td>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEmptyBin(bin.binId);
                  }}
                  className="edit-btn"
                >
                  {getStatusIcon(bin.status)}
                  Empty Bin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
