
import schoolCoreLogo from "../assets/schoolCoreLogo.png";
import schoolCoreLogoWhite from "../assets/schoolCoreLogoWhite.png";
import "../css/navbar-style.css"
function Navbar({ darkMode, setDarkMode }) {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img
          src={darkMode ? schoolCoreLogoWhite : schoolCoreLogo}
          alt="logo"
          className="logo-img"
        />
        <span className="logo-text">SchoolCoreOS</span>
      </div>

     
    </div>
  );
}

export default Navbar;