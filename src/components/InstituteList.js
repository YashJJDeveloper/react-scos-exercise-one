import { useNavigate } from "react-router-dom";
import InstituteCard from "./InstituteCard";
import "../css/card-style.css";
import { useState } from "react";

function InstituteList() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.email.split("@")[0];
  const [search, setSearch] = useState("");
  // Redirect if not logged in
  if (!user) {
    navigate("/login");
    return null;
  }

  const institutes = user.institutes || [];
  const filteredInstitutes = institutes.filter((inst) =>
    inst.name.toLowerCase().includes(search.toLowerCase())
  );
  
  if (institutes.length === 0) {
    return (
      <>
        <h1>You are not assigned to any institute yet !</h1>
      </>
    );
  }
  // Auto redirect if only one institute
  if (institutes.length === 1) {
    navigate("/roles", { state: institutes[0] });
  }

  const handleSelect = (institute) => {
    navigate("/roles", { state: institute });
  };

  return (
    <div className="main-body">
       {/* <button className="back-btn" onClick={() => navigate("/login")}>
        ← Go to Login
      </button> */}
      <h2>Hi, {username}!</h2>
      <p className="subtitle">Select your institute to access your dashboard</p>
{/* Search Bar for More than 5 insitutes */}
      {institutes.length > 5 && (
        <div className="search-box">
          <input
            placeholder="Search your institute..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      )}
{/* Institute Mapping */}
      <div className="card-row">
        {filteredInstitutes.map((inst, index) => (
          <div
            key={index}
            onClick={() => handleSelect(inst)}
            style={{ cursor: "pointer" }}
          >
            <InstituteCard instLogo={inst.instLogo} name={inst.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default InstituteList;
