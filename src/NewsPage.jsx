import React from "react";
import "./NewsPage.css";

const NewsPage = () => {
  return (
    <div className="news-page">
      <h1 className="page-title">Live Disaster News</h1>

      {/* NDTV Live */}
      <div className="news-section">
        <h2 className="channel-title">NDTV Live</h2>
        <iframe
  src="https://www.ndtv.com/livetv-ndtv24x7"
  title="NDTV Live"
  className="news-stream"
  frameBorder="0"
  allowFullScreen
  sandbox="allow-same-origin allow-scripts allow-popups"
></iframe>

      </div>

      {/* Zee News Live */}
      <div className="news-section">
        <h2 className="channel-title">Zee News Live</h2>
        <iframe
          src="https://zeenews.india.com/live-tv"
          title="Zee News Live"
          className="news-stream"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      {/* BBC News Live */}
      <div className="news-section">
        <h2 className="channel-title">BBC News Live</h2>
        <iframe
          src="https://www.bbc.com/news/av/10462520/live-bbc-news-channel"
          title="BBC News Live"
          className="news-stream"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default NewsPage;
