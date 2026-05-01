import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import schoolCoreLogo from "../assets/schoolCoreLogo.png";
import schoolCoreLogoWhite from "../assets/schoolCoreLogoWhite.png";
import API from "../api";
import transformUserData from "../utils/transformUserData";
import ThemeSwitcher from "../common-components/ThemeSwitcher";
import Button from "../common-components/Button";
import Input from "../common-components/Input";

function Login({ darkMode, setDarkMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Error state changed:", error);
  }, [error]);
  const validateLogin = async () => {
    if (!email || !password) {
      setError("Email and password required");
      return;
    }

    setError("");
    setLoading(true);

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
      if (err.response?.status === 401) setError(err.response.data.message);
      else if (err.response?.status === 500)
        setError("Server error, try again");
      else setError("Login failed");
    } finally {
      setLoading(false);
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
            <strong className="taglin-strong">Operating System</strong> for
            your institute
          </p>

          {/* Inputs */}
          <Input
            type="email"
            placeholder="Enter phone or email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggleable={true}
          />

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* Button */}
          <Button
            type="button"
            onClick={validateLogin}
            disabled={loading}
            loading={loading}
            fullWidth
            size="lg"
          >
            Continue
          </Button>

          {/* Footer */}
          <p className="footer-text">
            By continuing, you agree to our{" "}
            <span style={{ color: "#3b82f6" }}>Terms & Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
