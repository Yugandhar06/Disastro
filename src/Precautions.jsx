import "./Precautions.css";

const Precautions = () => {
  return (
    <div className="precautions-container">
      <h2>🛡️ Safety Precautions</h2>

      {/* 🔥 Fire Safety */}
      <div className="precaution-section">
        <h3>🔥 Fire Safety</h3>
        <ul>
          <li>✅ Install fire extinguishers & smoke detectors at home.</li>
          <li>✅ Avoid overloading electrical outlets.</li>
          <li>✅ Keep emergency exits clear & conduct evacuation drills.</li>
        </ul>
        <iframe 
          width="100%" 
          height="300" 
          src="https://www.youtube.com/embed/RsEII7RO73I" 
          title="Fire Safety Tips"
          frameBorder="0" 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
      </div>

      {/* 🌊 Flood Safety */}
      <div className="precaution-section">
        <h3>🌊 Flood Safety</h3>
        <ul>
          <li>✅ Move to higher ground if flooding occurs.</li>
          <li>✅ Avoid walking or driving through floodwaters.</li>
          <li>✅ Store emergency food, water, and medical supplies.</li>
        </ul>
        <iframe 
          width="100%" 
          height="300" 
          src="https://www.youtube.com/embed/VWWiVgNkWjA" 
          title="Flood Safety Tips"
          frameBorder="0" 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
      </div>

      {/* 🌪️ Cyclone & Storm Safety */}
      <div className="precaution-section">
        <h3>🌪️ Cyclone & Storm Safety</h3>
        <ul>
          <li>✅ Secure windows & doors before the storm hits.</li>
          <li>✅ Stay indoors & away from glass windows.</li>
          <li>✅ Keep an emergency kit with flashlight, radio, and water.</li>
        </ul>
        <iframe 
          width="100%" 
          height="300" 
          src="https://www.youtube.com/embed/1zAzY0kLJ-M" 
          title="Cyclone Safety Tips"
          frameBorder="0" 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
      </div>

      {/* 🌍 Earthquake Safety */}
      <div className="precaution-section">
        <h3>🌍 Earthquake Safety</h3>
        <ul>
          <li>✅ Drop, Cover, Hold—stay under sturdy furniture.</li>
          <li>✅ Stay away from glass and falling objects.</li>
          <li>✅ After the shaking stops, check for gas leaks & evacuate if needed.</li>
        </ul>
        <iframe 
          width="100%" 
          height="300" 
          src="https://www.youtube.com/embed/7fSw2rgC8Dc" 
          title="Earthquake Safety Tips"
          frameBorder="0" 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
      </div>
    </div>
  );
};

export default Precautions;
