import React, { useEffect, useState } from "react";

const FireAlerts = () => {
  const [fires, setFires] = useState([]);

  useEffect(() => {
    const apiKey = "e1566f41caa53c5a5d1c420e07cbd987"; // NASA FIRMS API key
    const satellite = "VIIRS_SNPP"; // Satellite type
    const days = 5; // Range: 1-10
    const area = "-124.5,32.5,-114.0,42.0"; // California (west,south,east,north)

    const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${apiKey}/${satellite}/${days}/${area}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        const rows = text.split("\n");
        const header = rows[0].split(",");

        const latIndex = header.indexOf("latitude");
        const lonIndex = header.indexOf("longitude");
        const brightnessIndex = header.indexOf("brightness");
        const confidenceIndex = header.indexOf("confidence");
        const dateIndex = header.indexOf("acq_date");

        const parsedFires = rows.slice(1).map((row) => {
          const columns = row.split(",");
          return {
            latitude: parseFloat(columns[latIndex]),
            longitude: parseFloat(columns[lonIndex]),
            brightness: columns[brightnessIndex],
            confidence: columns[confidenceIndex],
            date: columns[dateIndex],
          };
        }).filter(fire => !isNaN(fire.latitude) && !isNaN(fire.longitude));

        setFires(parsedFires);
      })
      .catch((error) => console.error("Error fetching fire data:", error));
  }, []);

  return (
    <div className="fire-alerts-container" style={{ color: "white", textAlign: "center", padding: "2rem" }}>
      <h2 style={{ color: "red" }}>🔥 Fire Alerts: California (Last 5 Days)</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {fires.length === 0 ? (
          <p>No fire data found for the selected region and time.</p>
        ) : (
          fires.map((fire) => (
            <li key={`${fire.latitude}-${fire.longitude}`} style={{ marginBottom: "1.5rem" }}>
              <strong>🔥 Location:</strong> {fire.latitude}, {fire.longitude}<br />
              <strong>Brightness:</strong> {fire.brightness}<br />
              <strong>Confidence:</strong> {fire.confidence}%<br />
              <strong>Date:</strong> {fire.date}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FireAlerts;
