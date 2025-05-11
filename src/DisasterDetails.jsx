import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DisasterDetails.css";

const DISASTER_API = "https://eonet.gsfc.nasa.gov/api/v3/events";
const NEWS_API = "https://newsapi.org/v2/everything";
const NEWS_API_KEY = "ecf5f119d8bc46f996ba74930dec9f9a";  
const UNSPLASH_API_KEY = "JJuNXEQUbr6i-g4RNW04rAc4P8rcsk78CSgn9jhMARM";  

const DisasterDetails = () => {
  const { id } = useParams();
  const [disaster, setDisaster] = useState(null);
  const [news, setNews] = useState([]);
  const [disasterImage, setDisasterImage] = useState("");
  const [casualties, setCasualties] = useState({ deaths: 0, injuries: 0 });

  useEffect(() => {
    fetchDisasterDetails();
  }, []);

  useEffect(() => {
    if (disaster) {
      fetchNews();
      fetchDisasterImage();
      fetchCasualties();  // ✅ Fetch deaths & injury data
    }
  }, [disaster]);

  const fetchDisasterDetails = async () => {
    try {
      const response = await axios.get(`${DISASTER_API}/${id}`);
      setDisaster(response.data);
    } catch (error) {
      console.error("Error fetching disaster details:", error);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `${NEWS_API}?q="${disaster.title}" AND "${disaster.categories[0]?.title}"&language=en&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
      );

      setNews(response.data.articles.filter(
        article => article.title.includes(disaster.title) || article.description.includes(disaster.title)
      ));

    } catch (error) {
      console.error("Error fetching news articles:", error);
    }
  };

  const fetchDisasterImage = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query="${disaster.categories[0]?.title}"&client_id=${UNSPLASH_API_KEY}`
      );
      setDisasterImage(response.data.results[0]?.urls.full || "");
    } catch (error) {
      console.error("Error fetching disaster image:", error);
    }
  };

  const fetchCasualties = async () => {
    try {
      const response = await axios.get(`https://api.globaldisasterdata.org/casualties?disaster=${disaster.title}`);
      setCasualties(response.data);
    } catch (error) {
      console.error("Error fetching casualties data:", error);
    }
  };

  return (
    <div className="disaster-details">
      {disaster ? (
        <>
          <img src={disasterImage} alt={disaster.title} className="disaster-image"/>

          <div className="disaster-info">
            <h2>🌍 {disaster.title}</h2>
            <p><b>Type:</b> {disaster.categories[0]?.title}</p>
            <p><b>Location:</b> {disaster.geometry[0]?.coordinates.join(", ")}</p>
            <p><b>Date:</b> {disaster.closed || "Ongoing"}</p>
            <p><b>Impact Level:</b> ⚠️ High</p>
            <p><b>Deaths:</b> ☠️ {casualties.deaths}</p>
            <p><b>Injuries:</b> 🤕 {casualties.injuries}</p>
          </div>

          {/* ✅ Live News Feed */}
          <div className="news-section">
            <h3>📰 Related News Articles</h3>
            {news.length > 0 ? (
              news.slice(0, 5).map((article, index) => (
                <a key={index} href={article.url} target="_blank" rel="noopener noreferrer">
                  <div className="news-item">
                    <h4>{article.title}</h4>
                    <p>{article.source.name}</p>
                  </div>
                </a>
              ))
            ) : (
              <p>No recent news found.</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading disaster details...</p>
      )}
    </div>
  );
};

export default DisasterDetails;
