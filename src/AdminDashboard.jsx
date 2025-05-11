import React, { useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [reports, setReports] = useState([
    { id: 1, location: "Hyderabad", description: "Flood reported in the area." },
    { id: 2, location: "Mumbai", description: "Severe rainfall causing road blockages." },
    { id: 3, location: "Delhi", description: "Heatwave affecting the region." }
  ]); // Example data for testing purposes

  const handleResolve = (id) => {
    // Logic to mark the report as resolved
    const updatedReports = reports.filter((report) => report.id !== id);
    setReports(updatedReports);
    alert(`Report ID ${id} resolved successfully.`);
  };

  return (
    <div className="admin-dashboard">
      <h2>🌐 Admin Dashboard</h2>
      <p>Manage and review disaster alerts reported by users.</p>

      <div className="reports-list">
        {reports.length > 0 ? (
          reports.map((report) => (
            <div key={report.id} className="report-card">
              <h4>Location: {report.location}</h4>
              <p>Description: {report.description}</p>
              <button className="resolve-button" onClick={() => handleResolve(report.id)}>
                Resolve
              </button>
            </div>
          ))
        ) : (
          <p>No active reports to display.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
