import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import LoginModal from "./components/LoginModal";

import Dashboard from "./Dashboard";
import DisasterMap from "./DisasterMap";
import FireMap from "./FireMap";
import WeatherDashboard from "./WeatherDashboard";
import DisasterReports from "./DisasterReports";
import DisasterDetails from "./DisasterDetails";
import SatelliteImagery from "./SatelliteImagery";
import EmergencyAlerts from "./EmergencyAlerts";
import AdminDashboard from "./AdminDashboard";
import AdditionalResources from "./AdditionalResources";
import FAQ from "./FAQ";
import NewsPage from "./NewsPage";
import MarineForecast from "./MarineForecast";
import DisasterAlerts from "./DisasterAlerts";
import FireAlerts from "./FireAlerts";
import ThunderstormPrediction from "./ThunderstormPrediction";
import ReportDisaster from "./ReportDisaster";
import Precautions from "./Precautions";
import HelpRequests from "./HelpRequests";
import Notifications from "./Notifications";
import Feedback from "./Feedback";

import "./App.css";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showHelpRequests, setShowHelpRequests] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const { user, login, logout } = useAuth();

  console.log('App user:', user);

  const handleProtectedClick = (e) => {
    if (!user) {
      e.preventDefault();
      setShowLogin(true);
    }
  };

  const handleLogin = (userData) => {
    console.log("Logged in user data:", userData);
    login(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    logout();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openModalIfNotLoggedIn = (setModalOpen) => {
    if (!user) {
      setShowLogin(true);
    } else {
      setModalOpen(true);
    }
  };

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className={`main-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <Navbar
          toggleSidebar={toggleSidebar}
          onProtectedClick={handleProtectedClick}
          user={user}
          onLogout={handleLogout}
        />
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          userRole={user?.role}
          onProtectedClick={handleProtectedClick}
        />

        {showLogin && (
          <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />
        )}

        {showHelpRequests && <HelpRequests isOpen onClose={() => setShowHelpRequests(false)} />}
        {showNotifications && <Notifications isOpen onClose={() => setShowNotifications(false)} />}
        {showFeedback && <Feedback isOpen onClose={() => setShowFeedback(false)} />}

        <main style={{ paddingTop: "80px", paddingLeft: isSidebarOpen ? "250px" : "0" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/marine-forecast" element={<MarineForecast />} />
            <Route path="/disaster-map" element={<DisasterMap />} />
            <Route path="/weather" element={<WeatherDashboard />} />
            <Route path="/reports" element={<DisasterReports />} />
            <Route path="/reports/:id" element={<DisasterDetails />} />
            <Route path="/satellite-imagery" element={<SatelliteImagery />} />
            <Route path="/alerts" element={<EmergencyAlerts />} />
            <Route path="/resources" element={<AdditionalResources />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/live-disaster-alerts" element={<DisasterAlerts />} />
            <Route path="/live-disaster-map" element={<DisasterMap />} />
            <Route path="/live-fire-alerts" element={<FireAlerts />} />
            <Route path="/live-fire-map" element={<FireMap />} />
            <Route path="/thunderstorm-prediction" element={<ThunderstormPrediction />} />
            <Route path="/report-disaster" element={<ReportDisaster />} />
            <Route path="/precautions" element={<Precautions />} />
            <Route path="/sections" element={<div>Sections Page</div>} />
            <Route path="/help-requests" element={user ? <HelpRequests isOpen onClose={() => {}} /> : <Navigate to="/" />} />
            <Route path="/notifications" element={user ? <Notifications isOpen onClose={() => {}} /> : <Navigate to="/" />} />
            <Route path="/feedback" element={user ? <Feedback isOpen onClose={() => {}} /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;