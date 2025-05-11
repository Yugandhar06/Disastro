import React, { useState } from "react";
import axios from "axios";

const DynamicAlertForm = () => {
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const sendAlert = async () => {
    try {
      const response = await axios.post("http://localhost:5000/send-alert", {
        email,
        alertMessage,
      });
      console.log(response.data.message); // Log success message
    } catch (error) {
      console.error(error.response?.data?.error || "Error sending alert");
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        placeholder="Enter alert message"
        value={alertMessage}
        onChange={(e) => setAlertMessage(e.target.value)}
      />
      <button onClick={sendAlert}>Send Alert</button>
    </div>
  );
};

export default DynamicAlertForm;
