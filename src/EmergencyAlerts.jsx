import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import "./EmergencyAlerts.css";

const ResizeMap = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize(); // Adjust map dimensions dynamically
  }, [map]);
  return null;
};

const EmergencyAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [location, setLocation] = useState({ lat: 17.385044, lon: 78.486671 }); // Default: Andhra Pradesh
  const [city, setCity] = useState("Hyderabad"); // Default city name
  const [loading, setLoading] = useState(true);
  const [showReportForm, setShowReportForm] = useState(false); // Toggle report form
  const [reportLocation, setReportLocation] = useState(""); // User-reported location

  const API_KEY = "8898686611a3fe5cc7c65ce148e0bf22"; // OpenWeatherMap API key

  // Fetch weather alerts based on coordinates
  const fetchWeatherAlerts = async (lat, lon) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.alerts) {
        setAlerts(data.alerts);
      } else {
        setAlerts([]);
      }
    } catch (error) {
      console.error("Error fetching weather alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch coordinates by city name
  const fetchCoordinates = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setLocation({ lat, lon });
        fetchWeatherAlerts(lat, lon); // Fetch alerts for new coordinates
      } else {
        alert("City not found. Please enter a valid city or village name.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  // Handle disaster report submission
  const handleReportSubmit = () => {
    if (!reportLocation) {
      alert("Please enter a location to report the disaster.");
      return;
    }

    // Simulate reporting to the admin
    alert(`Disaster alert reported for location: ${reportLocation}. The admin has been notified.`);
    setReportLocation(""); // Reset the location input
    setShowReportForm(false); // Hide the report form
  };

  // Fetch alerts on location change
  useEffect(() => {
    fetchWeatherAlerts(location.lat, location.lon);
  }, [location]);

  return (
    <div className="emergency-alerts">
      <h2>🚨 Emergency Alerts</h2>

      {/* City/Village Name Search */}
      <div className="city-search">
        <label htmlFor="city">City/Village Name:</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city or village name"
        />
        <button onClick={fetchCoordinates}>Search</button>
      </div>

      {/* Report a Disaster Button */}
      <div className="report-disaster">
        <button onClick={() => setShowReportForm(true)}>Report a Disaster</button>
      </div>

      {/* Disaster Report Form */}
      {showReportForm && (
        <div className="report-form">
          <h3>Report a Disaster Alert</h3>
          <label htmlFor="location">Enter Location:</label>
          <input
            type="text"
            id="location"
            value={reportLocation}
            onChange={(e) => setReportLocation(e.target.value)}
            placeholder="Enter the disaster location"
          />
          <button onClick={handleReportSubmit}>Submit Report</button>
        </div>
      )}

      {/* Alerts Feed */}
      <div className="alerts-feed">
        <h3>Active Alerts</h3>
        {loading ? (
          <p>Loading alerts...</p>
        ) : alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <div key={index} className="alert">
              <h4>{alert.event}</h4>
              <p><strong>Description:</strong> {alert.description}</p>
              <p><strong>Start:</strong> {new Date(alert.start * 1000).toLocaleString()}</p>
              <p><strong>End:</strong> {new Date(alert.end * 1000).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No active alerts for this location.</p>
        )}
      </div>

      {/* Full-Screen Map */}
      <div className="alerts-map">
        <h3>Emergency Zones Map</h3>
        <MapContainer
          center={[location.lat, location.lon]}
          zoom={10}
          style={{ height: "70vh", width: "90%", margin: "auto", borderRadius: "8px" }}
        >
          <ResizeMap /> {/* Dynamically adjust map size */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          <Marker position={[location.lat, location.lon]}>
            <Popup>
              <strong>{city}</strong>: Current location.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default EmergencyAlerts;
