import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import schoolCoreLogo from "../assets/schoolCoreLogo.png";
import schoolCoreLogoWhite from "../assets/schoolCoreLogoWhite.png";
import API from "../api";
import transformUserData from "../utils/transformUserData";
import ThemeSwitcher from "../common-components/ThemeSwitcher";

function Login({ darkMode, setDarkMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateLogin = async () => {
    console.log("LOGIN CLICKED");
    if (!email || !password) {
      setError("Email and password required");
      return;
    }

    setError(""); // reset previous error
    setLoading(true); // start loader

    try {
      const loginRes = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", loginRes.data.token);

      const { userId, email: userEmail } = loginRes.data;
      const res = await API.get(`/uir/users/${userId}/institutes-roles-list`);

      if (!res.data.length) {
        setError("No institutes found");
        return;
      }

      const userData = transformUserData(res.data, userEmail);
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/InstituteList");
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      if (err.response?.status === 401) setError(err.response.data.message);
      else if (err.response?.status === 500)
        setError("Server error, try again");
      else setError("Login failed");
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="login-page">
        <div className="navbar-theme-switcher">
          <ThemeSwitcher darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        <div className="login-card">
          {/* Logo */}
          <img src={schoolCoreLogo} className="logo logo-light" alt="logo" />
          <img
            src={schoolCoreLogoWhite}
            className="logo logo-dark"
            alt="logo"
          />

          {/* Title */}
          <h1 className="title">
            Mentrix<span className="title-part">OS</span>
          </h1>
          <p className="sub-title">
            MentrixOS = <span style={{ color: "#f97316" }}>Mentor</span> +
            Matrix + <span style={{ color: "#3b82f6" }}>Metrics</span>
          </p>
          <p className="tagline">
            combined into one{" "}
            <strong style={{ color: "black" }}>Operating System</strong> for
            your institute
          </p>
          {/* Inputs */}
          <input
            type="text"
            placeholder="Enter phone or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />

          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-input input"
            />
            <span
              className="material-symbols-outlined toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </div>

          {/* Button */}
          <button className="btn" onClick={validateLogin} disabled={loading}>
            {loading ? (
              <span className="loader"></span> // spinner inside button
            ) : (
              "Continue"
            )}
          </button>
          {/* Error */}
          {error && <p className="error">{error}</p>}

          {/* Footer */}
        </div>
      </div>
      <p className="footer-text">
        By continuing, you agree to our <span style={{ color: "#3b82f6" }}>Terms &{" "}
       Privacy Policy</span>
      </p>
    </div>
  );
}

export default Login;
