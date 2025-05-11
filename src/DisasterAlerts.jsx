import { useEffect, useState } from "react";
import "./DisasterAlerts.css";

const disasterIcons = {
  Earthquake: "🌍",
  Flood: "🌊",
  Hurricane: "🌀",
  Storm: "⛈",
  Tornado: "🌪",
  Fire: "🔥",
};

const DisasterAlerts = () => {
  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
    fetch("https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries")
      .then(response => response.json())
      .then(data => setDisasters(data.DisasterDeclarationsSummaries || []))
      .catch(error => console.error("Error fetching disasters:", error));
  }, []);

  const getSeverity = (type) => {
    if (["Earthquake", "Hurricane", "Tornado"].includes(type)) return "High";
    if (["Flood", "Storm"].includes(type)) return "Moderate";
    return "Low";
  };

  return (
    <div className="disaster-alerts-container">
      <h2>🌍 Live Disaster Alerts</h2>
      <div className="alerts-list">
        {disasters.length > 0 ? (
          disasters.map((disaster) => (
            <div className={`alert-card ${getSeverity(disaster.incidentType).toLowerCase()}`} key={disaster.disasterNumber}>
              <h3>{disasterIcons[disaster.incidentType] || "⚠"} {disaster.declarationType}</h3>
              <p><strong>Type:</strong> {disaster.incidentType}</p>
              <p><strong>Location:</strong> {disaster.state}</p>
              <p><strong>Severity:</strong> <span className={`severity-label ${getSeverity(disaster.incidentType).toLowerCase()}`}>{getSeverity(disaster.incidentType)}</span></p>
              <p><strong>Timestamp:</strong> {new Date(disaster.declarationDate).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p className="no-alerts">No disaster alerts available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default DisasterAlerts;
