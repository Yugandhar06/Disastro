import React, { useEffect, useState } from "react";

const ThunderstormPrediction = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = "3694ce1cf9923c72ac2e6d7c733c6f10"; // Replace with your actual key

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=40.7128&lon=-74.0060&exclude=minutely,hourly,daily&appid=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Weather Data:", data); // Debugging log
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  // Extract current weather conditions
  const weather = weatherData?.current?.weather || [];
  const isThunderstorm = weather.some(
    (condition) => condition.id >= 200 && condition.id < 300
  );

  return (
    <div>
      <h1>Thunderstorm Prediction</h1>
      {weather.length > 0 ? (
        <div>
          <h2>Weather Condition:</h2>
          <p>{weather[0].description}</p>
          {isThunderstorm ? (
            <p style={{ color: "red", fontWeight: "bold" }}>
              ⚡ Thunderstorm Alert! Stay Safe!
            </p>
          ) : (
            <p>No thunderstorm detected.</p>
          )}
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

export default ThunderstormPrediction;
