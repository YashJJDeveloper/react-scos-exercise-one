import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import RoleCard from "./RoleCard";
import Card from "../common-components/Card";
import Button from "../common-components/Button";
import Header from "../common-components/Header";
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

    if (institute?.roles.length === 1) {
      navigate("/dashboard", { state: institute.roles[0] });
    }
  }, [institute, navigate]);

  if (!institute || !institute.roles) return null;

  const handleSelect = (role) => {
    navigate("/dashboard", { state: role });
  };

  return (
    <div className="main-body">
      <div className="settings-icon" >
        <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/InstituteList")}
        className="back-btn"
      >
        ← Change Institute
      </Button>
      </div>

      {/* Selected Institute Card */}
      <Card
        image={institute.inst_logo}
        title={institute.institute_name}
        subtitle="Mumbai, Maharashtra"
        rightContent={<div className="settings-icon">⚙</div>}
        className="selected-inst"
      />

      <Header
        title="Select Your Role"
        subtitle="Select your role for institute to continue"
      />

      {/* Role Mapping */}
      <div className="card-row">
        {institute.roles.map((role, index) => (
          <RoleCard
            key={index}
            name={role.role_name}
            role_logo={role.role_logo}
            onClick={() => handleSelect(role)}
          />
        ))}
      </div>
    </div>
  );
}

export default RolesList;
