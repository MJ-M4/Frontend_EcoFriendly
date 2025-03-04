import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const MapComponent = ({ bins, selectedBin }) => {
  const mapRef = useRef(null);
  const position = [31.771959, 35.217018]; // Default center (e.g., Jerusalem)

  // Center map on selected bin
  useEffect(() => {
    if (selectedBin && mapRef.current) {
      mapRef.current.setView([selectedBin.lat, selectedBin.lon], 15);
    }
  }, [selectedBin]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
      whenCreated={map => { mapRef.current = map; }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {bins.map(bin => (
        <Marker key={bin.id} position={[bin.lat, bin.lon]}>
          <Popup>{`Bin ${bin.id}: ${bin.status}`}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;