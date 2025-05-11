import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = ({ userRole, onProtectedClick }) => {
  console.log('Sidebar userRole:', userRole);

  return (
    <aside className="sidebar">
      <ul className="sidebar-links">
        <li>
          <Link to="/disaster-map" onClick={onProtectedClick}>
            <i className="fas fa-globe"></i> <span>Global Disaster Map</span>
          </Link>
        </li>
        <li>
          <Link to="/live-disaster-alerts" onClick={onProtectedClick}>
            <i className="fas fa-exclamation-triangle"></i> <span>Live Disaster Alerts</span>
          </Link>
        </li>
        <li>
          <Link to="/live-disaster-map" onClick={onProtectedClick}>
            <i className="fas fa-map"></i> <span>Live Disaster Map</span>
          </Link>
        </li>
        {userRole === "admin" && (
          <li>
            <Link to="/admin-dashboard" onClick={onProtectedClick}>
              <i className="fas fa-user-shield"></i> <span>Admin Dashboard</span>
            </Link>
          </li>
        )}
        {userRole && (
          <li>
            <Link to="/sections" onClick={onProtectedClick}>
              <i className="fas fa-list"></i> <span>Sections</span>
            </Link>
          </li>
        )}
        <li>
          <Link to="/weather" onClick={onProtectedClick}>
            <i className="fas fa-cloud-sun"></i> <span>Weather</span>
          </Link>
        </li>
        <li>
          <Link to="/reports" onClick={onProtectedClick}>
            <i className="fas fa-chart-bar"></i> <span>Disaster Reports</span>
          </Link>
        </li>
        <li>
          <Link to="/satellite-imagery" onClick={onProtectedClick}>
            <i className="fas fa-satellite"></i> <span>Satellite Imagery</span>
          </Link>
        </li>
        <li>
          <Link to="/resources" onClick={onProtectedClick}>
            <i className="fas fa-book"></i> <span>Relief Resources</span>
          </Link>
        </li>
        <li>
          <Link to="/precautions" onClick={onProtectedClick}>
            <i className="fas fa-shield-alt"></i> <span>Precautions</span>
          </Link>
        </li>
        <li>
          <Link to="/faq" onClick={onProtectedClick}>
            <i className="fas fa-question-circle"></i> <span>FAQs</span>
          </Link>
        </li>
        <li>
          <Link to="/news" onClick={onProtectedClick}>
            <i className="fas fa-newspaper"></i> <span>News Updates</span>
          </Link>
        </li>
        <li>
          <Link to="/live-fire-alerts">
            <i className="fas fa-fire"></i> <span>Live Fire Alerts</span>
          </Link>
        </li>
        <li>
          <Link to="/live-fire-map">
            <i className="fas fa-globe"></i> <span>Live Fire Map</span>
          </Link>
        </li>
        <li>
          <Link to="/thunderstorm-prediction" onClick={onProtectedClick}>
            <i className="fas fa-bolt"></i> <span>Thunderstorm</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;