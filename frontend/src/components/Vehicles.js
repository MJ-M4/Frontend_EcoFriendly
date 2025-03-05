// src/components/Vehicles.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/general.css';

const VehiclesPage = ({ onLogout, userRole }) => {
  // Mock vehicles data
  const initialVehicles = [
    { id: 1, type: 'Truck', licensePlate: 'ABC-123', status: 'Available', lastMaintenance: '2025-02-01' },
    { id: 2, type: 'Van', licensePlate: 'XYZ-789', status: 'In Use', lastMaintenance: '2025-01-15' },
    { id: 3, type: 'Maintenance Vehicle', licensePlate: 'MNT-456', status: 'Under Maintenance', lastMaintenance: '2025-03-01' },
  ];

  const [vehicles, setVehicles] = useState(initialVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [newVehicle, setNewVehicle] = useState({
    type: 'Truck', // Default value
    licensePlate: '',
    status: 'Available', // Default value
    lastMaintenance: '',
  });

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  // Filter vehicles by type or status
  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding a new vehicle
  const handleAddVehicle = () => {
    if (
      newVehicle.type &&
      newVehicle.licensePlate &&
      newVehicle.status &&
      newVehicle.lastMaintenance
    ) {
      const newId = vehicles.length + 1; // Simple ID generation
      setVehicles([...vehicles, { id: newId, ...newVehicle }]);
      setNewVehicle({
        type: 'Truck',
        licensePlate: '',
        status: 'Available',
        lastMaintenance: '',
      }); // Reset form
    } else {
      alert('Please fill in all fields to add a vehicle.');
    }
  };

  // Handle deleting a vehicle
  const handleDeleteVehicle = (id) => {
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
  };

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="vehicles" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Vehicles</h1>

        {/* Search Box */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by type or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px',
              width: '300px',
              borderRadius: '5px',
              border: '1px solid #e0e0e0',
              fontSize: '1rem',
            }}
          />
        </div>

        {/* Add Vehicle Form */}
        <div style={{ marginBottom: '20px' }}>
          <select
            value={newVehicle.type}
            onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0' }}
          >
            <option value="Truck">Truck</option>
            <option value="Van">Van</option>
            <option value="Maintenance Vehicle">Maintenance Vehicle</option>
          </select>
          <input
            type="text"
            placeholder="License Plate"
            value={newVehicle.licensePlate}
            onChange={(e) => setNewVehicle({ ...newVehicle, licensePlate: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0' }}
          />
          <select
            value={newVehicle.status}
            onChange={(e) => setNewVehicle({ ...newVehicle, status: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0' }}
          >
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
          <input
            type="date"
            value={newVehicle.lastMaintenance}
            onChange={(e) => setNewVehicle({ ...newVehicle, lastMaintenance: e.target.value })}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #e0e0e0' }}
          />
          <button
            onClick={handleAddVehicle}
            className="download-report-btn"
            style={{ padding: '10px 20px', height: '40px', width: '200px', margin: '5px' }}
          >
            Add Vehicle
          </button>
        </div>

        {/* Vehicles Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Vehicle ID</th>
                <th>Type</th>
                <th>License Plate</th>
                <th>Status</th>
                <th>Last Maintenance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.id}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.licensePlate}</td>
                  <td>{vehicle.status}</td>
                  <td>{vehicle.lastMaintenance}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#ff4d4f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VehiclesPage;