import { useState } from "react";
import "./Resources.css";

const Resources = () => {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div className="resources-container">
      <h2>🌍 Disaster Resources</h2>

      <div className="resource-buttons">
        <button onClick={() => setActiveSection("agencies")}>🚑 Disaster Response Agencies</button>
        <button onClick={() => setActiveSection("guides")}>📖 Safety Guides</button>
        <button onClick={() => setActiveSection("volunteer")}>🤝 Volunteer Support</button>
      </div>

      <div className="resource-content">
        {activeSection === "agencies" && (
          <div>
            <h3>🚑 Nearby Disaster Response Agencies</h3>
            <p>Fetching hospitals, rescue teams, and aid services near your location...</p>
            {/* ✅ Add API Integration Here for Location-Based Data */}
          </div>
        )}

        {activeSection === "guides" && (
          <div>
            <h3>📖 Safety Guides</h3>
            <p>Instructions for handling fires, floods, and earthquakes...</p>
            {/* ✅ Load Safety Guide Details Here */}
          </div>
        )}

        {activeSection === "volunteer" && (
          <div>
            <h3>🤝 Volunteer Support</h3>
            <p>Ways to contribute to disaster relief efforts...</p>
            {/* ✅ Add Volunteering Opportunities Here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
