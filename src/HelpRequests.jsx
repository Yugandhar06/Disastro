import { useState } from "react";
import "./HelpRequests.css";

const HelpRequests = ({ isOpen, onClose }) => {
  const [requestType, setRequestType] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = () => {
    alert(`Request Submitted:\nType: ${requestType}\nDetails: ${details}`);
    onClose(); // Close modal after submission
  };

  return isOpen ? (
    <div className="help-requests-overlay">
      <div className="help-requests-box">
        <h2>🆘 Submit a Help Request</h2>
        <label>Choose a Request Type:</label>
        <select value={requestType} onChange={(e) => setRequestType(e.target.value)}>
          <option value="">-- Select --</option>
          <option value="medical">🚑 Medical Help</option>
          <option value="evacuation">🚔 Evacuation Assistance</option>
          <option value="food">🍲 Food & Water</option>
          <option value="shelter">🏠 Shelter Assistance</option>
          <option value="search-rescue">🚨 Search & Rescue</option>
          <option value="volunteer">🤝 Volunteer Support</option>
        </select>

        <label>Details:</label>
        <textarea
          placeholder="Describe the situation..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        <button className="submit-btn" onClick={handleSubmit}>Submit Request</button>
        <button className="close-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  ) : null;
};

export default HelpRequests;
