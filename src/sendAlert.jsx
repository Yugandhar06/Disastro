import React from "react";
import { sendAlert } from "./apiUtils";

const AlertButton = () => {
  const handleAlert = () => {
    sendAlert("example@gmail.com", "Flood warning in your area. Evacuate immediately.");
  };

  return (
    <button onClick={handleAlert}>
      Send Disaster Alert
    </button>
  );
};

export default AlertButton;
