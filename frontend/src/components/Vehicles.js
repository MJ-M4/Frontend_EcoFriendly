import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/reset.css';
import './css/layout.css';
import './css/components.css';
import './css/themes.css';
import './css/responsive.css';

const VehiclesPage = ({ onLogout, userRole }) => {
  const initialVehicles = [
    { id: 1, type: 'Garbage Truck', licensePlate: 'ABC-123', status: 'Available', lastMaintenance: '2025-02-01' },
    { id: 2, type: 'Van', licensePlate: 'XYZ-789', status: 'In Use', lastMaintenance: '2025-01-15' },
    { id: 3, type: 'Maintenance Vehicle', licensePlate: 'MNT-456', status: 'Under Maintenance', lastMaintenance: '2025-03-01' },
  ];

  const [vehicles, setVehicles] = useState(initialVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [newVehicle, setNewVehicle] = useState({
    type: 'Garbage Truck',
    licensePlate: '',
    status: 'Available',
    lastMaintenance: '',
  });

  const user = { name: 'Mohamed Mhagne', avatar: '/images/sami.png' };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddVehicle = () => {
    if (newVehicle.type && newVehicle.licensePlate && newVehicle.status && newVehicle.lastMaintenance) {
      const newId = vehicles.length + 1;
      setVehicles([...vehicles, { id: newId, ...newVehicle }]);
      setNewVehicle({ type: 'Garbage Truck', licensePlate: '', status: 'Available', lastMaintenance: '' });
    } else {
      alert('Please fill in all fields to add a vehicle.');
    }
  };

  const handleDeleteVehicle = (id) => {
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
  };

  return (
    <div className="dashboard">
      <Sidebar user={user} activePage="vehicles" onLogout={onLogout} userRole={userRole} />
      <div className="content">
        <h1>Vehicles</h1>
        <div className="form-container">
          <input
            type="text"
            placeholder="Search by type or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="form-container vehicle-form">
          <select
            value={newVehicle.type}
            onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
            className="form-input"
          >
            <option value="Garbage Truck">Garbage Truck</option>
            <option value="Van">Van</option>
            <option value="Maintenance Vehicle">Maintenance Vehicle</option>
            <option value="Electric Vehicle">Electric Vehicle</option>
            <option value="Sweeper Vehicle">Sweeper Vehicle</option>
            <option value="Recycling Truck">Recycling Truck</option>
            <option value="Utility Vehicle">Utility Vehicle</option>
            <option value="Compactor Truck">Compactor Truck</option>
            <option value="Skip Truck">Skip Truck</option>
            <option value="Water Tanker">Water Tanker</option>
            <option value="Mini Truck">Mini Truck</option>
          </select>
          <input
            type="text"
            placeholder="License Plate"
            value={newVehicle.licensePlate}
            onChange={(e) => setNewVehicle({ ...newVehicle, licensePlate: e.target.value })}
            className="form-input"
          />
          <select
            value={newVehicle.status}
            onChange={(e) => setNewVehicle({ ...newVehicle, status: e.target.value })}
            className="form-input"
          >
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
          <input
            type="date"
            value={newVehicle.lastMaintenance}
            onChange={(e) => setNewVehicle({ ...newVehicle, lastMaintenance: e.target.value })}
            className="form-input"
          />
          <button onClick={handleAddVehicle} className="download-report-btn">
            Add Vehicle
          </button>
        </div>
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
                    <button onClick={() => handleDeleteVehicle(vehicle.id)} className="action-btn delete">
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