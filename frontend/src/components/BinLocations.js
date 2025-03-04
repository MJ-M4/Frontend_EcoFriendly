// src/components/BinLocations.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './BinLocations.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const BinLocations = () => {
  // Sample data for waste bins (replace with API data)
  const [bins] = useState([
    {
      id: 1,
      location: 'Downtown',
      lat: 51.505,
      lng: -0.09,
      fullness: 75,
      lastUpdated: '2023-10-01',
    },
    {
      id: 2,
      location: 'City Park',
      lat: 51.51,
      lng: -0.1,
      fullness: 50,
      lastUpdated: '2023-10-02',
    },
    {
      id: 3,
      location: 'Main Street',
      lat: 51.51,
      lng: -0.12,
      fullness: 90,
      lastUpdated: '2023-10-03',
    },
  ]);

  // Center of the map
  const mapCenter = [31.0461, 34.8516];

  return (
    <div className="bin-locations">
      <h2>Waste Bin Locations</h2>
      <div className="map-and-table">
        {/* Map */}
        <div className="map-container">
          <MapContainer center={mapCenter} zoom={8} style={{ height: '500px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {bins.map((bin) => (
              <Marker key={bin.id} position={[bin.lat, bin.lng]}>
                <Popup>
                  <div>
                    <h3>{bin.location}</h3>
                    <p>Fullness: {bin.fullness}%</p>
                    <p>Last Updated: {bin.lastUpdated}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Location</th>
                <th>Fullness (%)</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {bins.map((bin) => (
                <tr key={bin.id}>
                  <td>{bin.id}</td>
                  <td>{bin.location}</td>
                  <td>{bin.fullness}</td>
                  <td>{bin.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BinLocations;