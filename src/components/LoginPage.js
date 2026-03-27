import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import usersData from "../data/userdata";
import schoolCoreLogo from "../assets/schoolCoreLogo.png";
import schoolCoreLogoWhite from "../assets/schoolCoreLogoWhite.png"
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
// user validation 
  const validateLogin = () => {
    if (!email || !password) {
      setError("Email and password cannot be empty");
      return;
    }

    const user = usersData.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Invalid user");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    navigate("/InstituteList");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo */}
        <img src={schoolCoreLogo} className="logo logo-light" alt="logo"/>
<img src={schoolCoreLogoWhite} className="logo logo-dark" alt="logo"/>

        {/* Title */}
        <h1 className="title">SchoolCoreOS</h1>

        {/* Inputs */}
        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
  );
}

export default Login;
