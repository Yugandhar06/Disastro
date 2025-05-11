import React, { useState } from "react";
import "./SatelliteImagery.css";

const SatelliteImagery = () => {
  const [isPlaying, setIsPlaying] = useState(true); // ✅ Track video state

  const stopVideo = () => {
    setIsPlaying(false); // ✅ Stop video when button is clicked
  };

  return (
    <div className="satellite-imagery">
      {/* Embed NASA Live Video with Auto-Play */}
      {isPlaying ? (
     <iframe
     className="satellite-video"
     src="https://www.youtube.com/embed/xRPjKQtRXR8?autoplay=1&modestbranding=1&showinfo=0&controls=0&rel=0"
     title="Live Earth from Space"
     frameBorder="0"
     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     allowFullScreen
   ></iframe>
   
     
      ) : (
        <p>The live stream has been stopped. Press refresh or restart to resume.</p>
      )}

      {/* Stop Button */}
      <button className="stop-button" onClick={stopVideo}>Stop Video</button>
    </div>
  );
};

export default SatelliteImagery;
