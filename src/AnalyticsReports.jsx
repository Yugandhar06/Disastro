import React, { useState, useEffect } from "react";
import "./AnalyticsReports.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const AnalyticsReports = () => {
  const [reportData, setReportData] = useState({
    labels: ["Flood", "Earthquake", "Wildfire", "Storm"],
    datasets: [
      {
        label: "Disasters Reported",
        data: [50, 30, 70, 20], // Example data
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
      },
    ],
  });

  useEffect(() => {
    // Here, you can fetch real analytics data from an API or your backend.
  }, []);

  return (
    <div className="analytics-reports">
      <h2>Analytics and Reports</h2>
      <p>Visualize disaster data and generate performance reports:</p>
      <div className="chart-container">
        <Bar
          data={reportData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Disasters Reported by Type",
              },
            },
          }}
        />
      </div>
      <button className="generate-report-button">Generate Report</button>
    </div>
  );
};

export default AnalyticsReports;
