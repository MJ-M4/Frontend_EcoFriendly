// src/components/MapComponent.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = () => {
  const mapCenter = [32.0461, 34.8516]; // Center on Israel
  const zoomLevel = 8;

  // Sample bin locations
  const bins = [
    { id: 1, location: 'Tel Aviv', lat: 32.0853, lng: 34.7818 },
    { id: 2, location: 'Jerusalem', lat: 31.7683, lng: 35.2137 },
    { id: 3, location: 'Haifa', lat: 32.7940, lng: 34.9896 },
    { id: 4, location: 'Nazareth', lat: 32.6996, lng: 35.3035 },
    { id: 5, location: 'Nazareth Illit', lat: 32.7120, lng: 35.3245 },
  ];

  return (
    <MapContainer center={mapCenter} zoom={zoomLevel} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {bins.map((bin) => (
        <Marker key={bin.id} position={[bin.lat, bin.lng]}>
          <Popup>{bin.location}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;