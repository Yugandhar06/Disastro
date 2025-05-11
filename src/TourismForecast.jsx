import React, { useState, useEffect } from "react";
import axios from "axios";

const TourismForecast = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTourismData = async () => {
      try {
        const response = await axios.get(
          "https://api.example.com/tourism-forecast?api_key=YOUR_API_KEY"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tourism forecast:", error);
        setLoading(false);
      }
    };

    fetchTourismData();
  }, []);

  if (loading) {
    return <p>Loading Tourism Forecast...</p>;
  }

  return (
    <div>
      <h1>Tourism Forecast</h1>
      <p>{data.message}</p>
    </div>
  );
};

export default TourismForecast;
