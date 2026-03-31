import { useNavigate } from "react-router-dom";
import InstituteCard from "./InstituteCard";
import { useState } from "react";
import "../css/card-style.css";

import SearchBar from "../common-components/SearchBar";
import Navbar from "../common-components/NavBar";

function InstituteList({darkMode, setDarkMode}) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  

  if (!user) {
    navigate("/login");
    return null;
  }

  const username = user.email.split("@")[0];
  

  const institutes = user.institutes || [];

  const filteredInstitutes = institutes.filter((inst) =>
    inst.name.toLowerCase().includes(search.toLowerCase())
  );

  if (institutes.length === 0) {
    return <h1>You are not assigned to any institute yet!</h1>;
  }

  if (institutes.length === 1) {
    navigate("/roles", { state: institutes[0] });
  }

  const handleSelect = (institute) => {
    navigate("/roles", { state: institute });
  };

  return (
    <div className="main-body">
      <div className="navbar"><Navbar darkMode={darkMode} setDarkMode={setDarkMode}  /></div>
      <h2>Hi, {username}!</h2>
      <p className="subtitle">
        Select your institute to access your dashboard
      </p>

      {/*   SearchBar */}
      {institutes.length > 5 && (
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your institute..."
        />
      )}

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