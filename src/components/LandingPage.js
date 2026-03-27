import "../css/landing-page.css"
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      <h2>Welcome</h2>

      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
}
export default LandingPage;
