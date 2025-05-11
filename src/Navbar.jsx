import './Navbar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onProtectedClick, user, onLogout }) => {
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);
  const [showAlertsDropdown, setShowAlertsDropdown] = useState(false);
  const role = user?.role?.toLowerCase();

  console.log('Navbar user:', user);

  const renderResourcesMenu = () => {
    if (!user) return null;

    const commonLinks = [
      { to: '/resources', label: 'Resources' },
      { to: '/notifications', label: 'Notifications' },
      { to: '/disaster-map', label: 'Disaster Map' },
    ];

    const userLinks = [
      { to: '/report-disaster', label: 'Report Disaster' },
      { to: '/help-requests', label: 'Help Requests' },
    ];

    const rescueLinks = [
      { to: '/disaster-reports', label: 'Disaster Reports' },
    ];

    const adminLinks = [
      { to: '/report-disaster', label: 'Report Disaster' },
      { to: '/help-requests', label: 'Help Requests' },
      { to: '/disaster-reports', label: 'Disaster Reports' },
      { to: '/rescue-teams', label: 'Rescue Teams' },
    ];

    let roleSpecificLinks = [];

    if (role === 'user') {
      roleSpecificLinks = userLinks;
    } else if (role === 'rescue') {
      roleSpecificLinks = rescueLinks;
    } else if (role === 'admin') {
      roleSpecificLinks = adminLinks;
    }

    const allLinks = [...roleSpecificLinks, ...commonLinks];

    return (
      <ul className="dropdown-menu">
        {allLinks.map((link, index) => (
          <li key={`${link.to}-${index}`}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav className="navbar">
      <div className="logo">🚨 Disaster Management</div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>

        {!user && (
          <li>
            <Link to="/login" onClick={onProtectedClick}>Login</Link>
          </li>
        )}

        {user && (
          <li
            className="dropdown-container"
            onMouseEnter={() => setShowResourcesDropdown(true)}
            onMouseLeave={() => setShowResourcesDropdown(false)}
          >
            <Link to="/resources" className="resources-button">
              Resources
            </Link>
            {showResourcesDropdown && renderResourcesMenu()}
          </li>
        )}

        <li
          className="dropdown-container"
          onMouseEnter={() => setShowAlertsDropdown(true)}
          onMouseLeave={() => setShowAlertsDropdown(false)}
        >
          <span className="dropdown-trigger">Alerts</span>
          {showAlertsDropdown && (
            <ul className="dropdown-menu">
              <li><Link to="/marine-forecast">Marine Forecast</Link></li>
              <li><Link to="/tourism-forecast">Tourism Forecast</Link></li>
              <li><Link to="/thunderstorm-prediction">Thunderstorm Prediction</Link></li>
              <li><Link to="/fog">Fog</Link></li>
              <li><Link to="/air-quality-silam">Air Quality by SILAM Model</Link></li>
              <li><Link to="/air-quality">Air Quality</Link></li>
              <li><Link to="/delhi-air-quality">Delhi Air Quality by Enfuser</Link></li>
              <li><Link to="/air-quality-safar">Air Quality by SAFAR</Link></li>
              <li><Link to="/pilgrimage-forecast">Pilgrimage Forecast</Link></li>
              <li><Link to="/power-sector">Power Sector</Link></li>
              <li><Link to="/mountain-wx-bulletin">Mountain Wx Bulletin</Link></li>
              <li><Link to="/highway-forecast">Highway Forecast</Link></li>
            </ul>
          )}
        </li>

        <li><Link to="/disasters">Disasters</Link></li>
        <li><Link to="/contact">Contact</Link></li>

        {user && role === 'user' && (
          <li>
            <Link to="/feedback" className="feedback-button">Feedback</Link>
          </li>
        )}
      </ul>

      {user && (
        <div className="navbar-user">
          <span>{user.username || 'User'}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;