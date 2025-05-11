import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./RescueDashboard.css";

// Simulated Rescue Data
const emergencyData = [
  { id: 1, type: "Earthquake", location: "Tokyo, Japan", severity: "High", status: "Ongoing" },
  { id: 2, type: "Flood", location: "Mumbai, India", severity: "Critical", status: "Ongoing" },
  { id: 3, type: "Wildfire", location: "California, USA", severity: "Severe", status: "Contained" },
];

// 3D Representation of Disaster
function DisasterModel({ type }) {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} />
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color={type === "Earthquake" ? "#ff6b6b" : type === "Flood" ? "#4d96ff" : "#ff9a3c"} />
      </mesh>
    </Canvas>
  );
}

// Rescue Dashboard Main Component
const RescueDashboard = () => {
  const [disasters, setDisasters] = useState(emergencyData);
  const [activeDisaster, setActiveDisaster] = useState(null);

  useEffect(() => {
    if (disasters.length > 0) {
      setActiveDisaster(disasters[0]); // Default first disaster selected
    }
  }, [disasters]);

  return (
    <div className="rescue-dashboard">
      <Navbar />
      <Sidebar />
      <div className="dashboard-content">
        <h1>🚨 Rescue Team Dashboard</h1>

        {/* Live Disaster Alerts */}
        <div className="emergency-alerts">
          <h2>Live Emergency Alerts</h2>
          <div className="disaster-list">
            {disasters.map((disaster) => (
              <div key={disaster.id} className="disaster-item" onClick={() => setActiveDisaster(disaster)}>
                <span className={`severity ${disaster.severity.toLowerCase()}`}>{disaster.severity}</span>
                <h3>{disaster.type} in {disaster.location}</h3>
                <p>Status: {disaster.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Disaster Visualization */}
        <div className="disaster-visualization">
          {activeDisaster && (
            <>
              <h2>Live Disaster Overview</h2>
              <DisasterModel type={activeDisaster.type} />
              <p>Tracking: {activeDisaster.type} at {activeDisaster.location}</p>
            </>
          )}
        </div>

        {/* Task Assignments for Rescue Teams */}
        <div className="task-assignments">
          <h2>⏳ Task Assignments</h2>
          <button className="assign-btn">📍 Assign Rescue Missions</button>
        </div>

        {/* Available Resources */}
        <div className="resource-availability">
          <h2>🚁 Available Resources</h2>
          <ul>
            <li>🚑 Medical Aid Teams: 12 deployed</li>
            <li>🚁 Helicopters: 5 ready</li>
            <li>⛑ Relief Goods: 300+ packages</li>
            <li>📡 Communication Units: Active</li>
          </ul>
        </div>

        {/* Emergency Mapping */}
        <div className="response-mapping">
          <h2>🗺️ Response Mapping</h2>
          <img src="https://maps.googleapis.com/maps/api/staticmap?center=0,0&zoom=5&size=1200x600&maptype=terrain&key=YOUR_API_KEY" alt="Rescue Map" />
        </div>
      </div>
    </div>
  );
};

export default RescueDashboard;
