import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import RoleCard from "./RoleCard";
import "../css/card-style.css";

function RolesList() {
  const location = useLocation();
  const navigate = useNavigate();

  const institute = location.state;

  console.log("Institute:", institute);

  useEffect(() => {
    if (!institute) {
      navigate("/InstituteList");
      return;
    }

    if (institute.roles.length === 1) {
      navigate("/dashboard", { state: institute.roles[0] });
    }
  }, [institute, navigate]);

  if (!institute || !institute.roles) return null;

  const handleSelect = (role) => {
    navigate("/dashboard", { state: role });
  };

  return (
    <div className="main-body">
      <button className="back-btn" onClick={() => navigate("/InstituteList")}>
        ← Change Institute
      </button>
{/* Selected Institute Card */}
      <div className="selected-inst">
        <img src={institute.instLogo} alt="institute-logo" />
        <div className="inst-info">
          <h4>{institute.name}</h4>
          <p>Mumbai, Maharashtra</p>
        </div>
        <div className="inst-action">⚙</div>
      </div>
      <h2 style={{ marginBottom: "20px" }}>Select Your Role</h2>
      <p>Select your role for institute to continue</p>
      {/* Role Mapping */}
      <div className="card-row">
        {institute.roles.map((role, index) => (
          <RoleCard
            key={index}
            name={role.name}
            img={role.img}
            onClick={() => handleSelect(role)}
          />
        ))}
      </div>
    </div>
  );
}

export default RolesList;
