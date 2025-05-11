import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const stateCoordinates = {
  Maharashtra: [19.7515, 75.7139],
  Gujarat: [22.2587, 71.1924],
  Odisha: [20.9517, 85.0985],
  TamilNadu: [11.1271, 78.6569],
};

const DisasterMap = () => {
  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
    fetch("https://api.reliefweb.int/v1/reports?appname=disaster-tracker&limit=10")
      .then(response => response.json())
      .then(data => setDisasters(data.data || []))
      .catch(error => console.error("Error fetching disasters:", error));
  }, []);

  return (
    <div className="map-container">
      <h2>🌍 Live Disaster Map</h2>
      <MapContainer center={[20, 80]} zoom={5} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {disasters.map((disaster, index) => {
          const state = disaster.fields.country?.[0]?.name;
          const coordinates = stateCoordinates[state] || [20, 80]; // Fallback if state isn't mapped

          return (
            <Marker key={index} position={coordinates}>
              <Popup>
                <strong>{disaster.fields.title}</strong><br />
                <em>{state || "Unknown Location"}</em>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default DisasterMap;
