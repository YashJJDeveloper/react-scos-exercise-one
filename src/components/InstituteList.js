import { useNavigate } from "react-router-dom";
import InstituteCard from "./InstituteCard";
import { useState, useEffect } from "react";
import "../css/card-style.css";

import SearchBar from "../common-components/SearchBar";
import Navbar from "../common-components/NavBar";
import Header from "../common-components/Header";

function InstituteList({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isReady, setIsReady] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const institutes = user?.institutes || [];

  // 🔒 Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      setIsReady(true); //  mark data ready
    }
  }, [user, navigate]);

  //  Auto redirect ONLY after data is ready
  useEffect(() => {
    if (!isReady) return; // make sure data is ready

    console.log("FINAL institutes:", institutes);

    if (institutes.length === 1) {
      navigate("/roles", { state: institutes[0] });
    }
  }, [isReady, institutes, navigate]);

  if (!user) return null;

  const username = user?.userEmail ? user.userEmail.split("@")[0] : "";

  const filteredInstitutes = institutes.filter((inst) =>
    inst?.institute_name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (institute) => {
    navigate("/roles", { state: institute });
  };

  if (institutes.length === 0) {
    return (
      <div className="main-body">
        <h1>You are not assigned to any institute yet!</h1>
      </div>
    );
  }

  return (
    <div className="main-body">
      <div className="navbar">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>

      <Header
        title={`Hi, ${username}!`}
        subtitle="Select your institute to access your dashboard"
      />

      {institutes.length > 5 && (
        <SearchBar
          data-testid="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your institute..."
        />
      )}

      <div className="card-row">
        {filteredInstitutes.map((inst) => (
          <div
            key={inst.inst_id}
            onClick={() => handleSelect(inst)}
            style={{ cursor: "pointer", width: "100%" }}
          >
            <InstituteCard
              instLogo={inst.inst_logo}
              name={inst.institute_name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default InstituteList;