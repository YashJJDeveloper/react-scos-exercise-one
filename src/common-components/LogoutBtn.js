import "../css/card-style.css"
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  );
}

export default LogoutBtn;