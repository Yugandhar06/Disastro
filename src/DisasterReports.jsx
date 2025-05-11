import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./DisasterReports.css";

const API_URL = "https://eonet.gsfc.nasa.gov/api/v3/events";

const DisasterReports = () => {
  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
    fetchDisasters();
  }, []);

  const fetchDisasters = async () => {
    try {
      const response = await axios.get(API_URL);
      setDisasters(response.data.events);
    } catch (error) {
      console.error("Error fetching disaster data:", error);
    }
  };

  return (
    <div className="disaster-reports">
      <h2>🌍 Global Disaster Reports</h2>

      {/* ✅ Live Disasters */}
      <div className="live-disasters">
        <h3>🌋 Current Disasters</h3>
        {disasters.length > 0 ? (
          disasters.map((disaster) => (
            <Link key={disaster.id} to={`/reports/${disaster.id}`} className="disaster-link">
              <div className="disaster-item">
                <p><b>{disaster.title}</b></p>
                <p>{disaster.categories[0]?.title}</p>
                <p>🗺️ Location: {disaster.geometry[0]?.coordinates.join(", ")}</p>
                <p>📅 Date: {disaster.closed || "Ongoing"}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>Loading disaster data...</p>
        )}
      </div>
    </div>
  );
};

export default DisasterReports;
