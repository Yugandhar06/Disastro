import React, { useEffect, useState } from "react";
import "./DisasterMonitoring.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // Using Leaflet.js for map integration
import "leaflet/dist/leaflet.css";

const DisasterMonitoring = () => {
  const [disasterZones, setDisasterZones] = useState([
    { id: 1, name: "Wildfire in California", latitude: 36.7783, longitude: -119.4179, severity: "High" },
    { id: 2, name: "Flood in Bangladesh", latitude: 23.685, longitude: 90.3563, severity: "Critical" },
    { id: 3, name: "Earthquake in Japan", latitude: 35.6762, longitude: 139.6503, severity: "Moderate" },
  ]);

  useEffect(() => {
    // Ideally, fetch disaster data from an API here (e.g., NASA FIRMS or OpenWeatherMap).
  }, []);

  return (
    <div className="disaster-monitoring">
      <h2>Disaster Monitoring</h2>
      <p>Track active disaster zones in real-time using the map below:</p>
      <MapContainer center={[20.5937, 78.9629]} zoom={3} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {disasterZones.map((zone) => (
          <Marker key={zone.id} position={[zone.latitude, zone.longitude]}>
            <Popup>
              <strong>{zone.name}</strong>
              <br />
              Severity: {zone.severity}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default DisasterMonitoring;
