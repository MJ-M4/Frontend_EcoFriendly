import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = ({ bins }) => {
  const mapCenter = [32.0461, 34.8516]; // Center in Israel
  const zoomLevel = 8;

  return (
    <MapContainer center={mapCenter} zoom={zoomLevel} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {bins.map((bin) => (
        <Marker key={bin.id} position={[bin.lat, bin.lon]}>
          <Popup>{`${bin.id} - Capacity: ${bin.capacity}%`}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
