import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
// import usersData from "../data/userdata";
import schoolCoreLogo from "../assets/schoolCoreLogo.png";
import schoolCoreLogoWhite from "../assets/schoolCoreLogoWhite.png";
import API from "../api";
import transformUserData from "../utils/transformUserData";

import ThemeSwitcher from "../common-components/ThemeSwitcher";
function Login({ darkMode, setDarkMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // const validateLogin = async () => {
  //   if (!email || !password) {
  //     setError("Email and password cannot be empty");
  //     return;
  //   }

  //   const user = usersData.find(
  //     (u) => u.email === email && u.password === password
  //   );

  //   if (!user) {
  //     setError("Invalid user");
  //     return;
  //   }

  //   localStorage.setItem("user", JSON.stringify(user));
  //   navigate("/InstituteList");
  // };

  const validateLogin = async () => {
    console.log("LOGIN CLICKED");
    console.log("EMAIL:", email);
console.log("PASSWORD:", password);
    try {
      if (!email || !password) {
        setError("Email and password required");
        return;
      }
      console.log("CALLING LOGIN API...");
      const loginRes = await API.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", loginRes.data.token);
      const { userId, email: userEmail } = loginRes.data;
      console.log("LOGIN RESPONSE:", loginRes.data);
      const res = await API.get(`/uir/users/${userId}/institutes-roles-list`);

      if (!res.data.length) {
        setError("No institutes found");
        return;
      }

      const userData = transformUserData(res.data, userEmail);
     
      console.log("TOKEN:", loginRes.data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/InstituteList");
    } catch (err) {
      console.error(err);

      // ✅ IMPORTANT
      if (err.response?.status === 401) {
        setError(err.response.data.message); // "Invalid password" / "User not found"
      } else {
        setError("Login failed");
      }
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
          <h1 className="title">SchoolCoreOS</h1>

          {/* Inputs */}
          <input
            type="text"
            placeholder="Username"
            value={email}
            
            onChange={
              (e) => setEmail(e.target.value)}
            className="input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />

          {/* Button */}
          <button className="btn" onClick={validateLogin}>
            Continue
          </button>

          {/* Error */}
          {error && <p className="error">{error}</p>}

          {/* Footer */}
          <p className="footer-text">
            By continuing, you agree to our <span>Terms</span> &{" "}
            <span>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
