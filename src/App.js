import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import "./App.css";

import LandingPage from "./components/LandingPage";
import Login from "./components/LoginPage";
import InstituteList from "./components/InstituteList";
import RolesList from "./components/RolesList";
import Dashboard from "./components/Dashboard";
import schoolCoreLogo from "./assets/schoolCoreLogo.png";
import schoolCoreLogoWhite from "./assets/schoolCoreLogoWhite.png";
import PrivateRoute from "./private-routes/PrivateRoute";
function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="main-container">
        {/* NAVBAR */}
        <div className="navbar">
          <div className="logo-container">
            {darkMode ? (
              <img
                src={schoolCoreLogoWhite}
                alt="SchoolCore Logo"
                className="logo-img"
              />
            ) : (
              <img
                src={schoolCoreLogo}
                alt="SchoolCore Logo"
                className="logo-img"
              />
            )}
            <span className="logo-text">SchoolCoreOS</span>
          </div>
          <div className="nav-btns">
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
            {/* DARK MODE BUTTON */}
            <button
              className="toggle-mode"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/InstituteList"
            element={
              <PrivateRoute>
                <InstituteList />
              </PrivateRoute>
            }
          />

          <Route
            path="/roles"
            element={
              <PrivateRoute>
                <RolesList />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
