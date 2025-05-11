import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';

const GlobalDisasterMap = () => {
  const [fireData, setFireData] = useState([]);

  useEffect(() => {
    const fetchFireData = async () => {
      try {
        const response = await axios.get(
          `https://firms.modaps.eosdis.nasa.gov/api/viirs?key=vKrZtHyGhs0Fvf6FXSOgKmUXLytgV0MeibPx04zc&time=24h`
        );
        setFireData(response.data);
      } catch (error) {
        console.error('Error fetching FIRMS data:', error);
      }
    };

    fetchFireData();
  }, []);

  return (
    <MapContainer style={{ width: '100%', height: '100vh' }} center={[0, 0]} zoom={3}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {fireData.map((fire, index) => (
        <CircleMarker
          key={index}
          center={[fire.latitude, fire.longitude]}
          radius={5}
          color="red"
          fillOpacity={0.8}
        />
      ))}
    </MapContainer>
  );
};

export default GlobalDisasterMap;
