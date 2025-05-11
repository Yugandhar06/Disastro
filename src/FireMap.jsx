import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const FireMap = () => {
  const date = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url={`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`}
        attribution="Imagery courtesy NASA EOSDIS GIBS"
      />
    </MapContainer>
  );
};

export default FireMap;
