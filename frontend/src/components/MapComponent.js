import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = ({ bins }) => {
  const mapCenter = [32.0461, 34.8516]; 
  const zoomLevel = 8;

  return (
    <MapContainer center={mapCenter} zoom={zoomLevel} className="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />
      {bins.map((bin) => (
        <Marker key={bin.binId} position={[bin.lat, bin.lon]}>
          <Popup>{`${bin.binId} - Capacity: ${bin.capacity}%`}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;