import {  Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";


import Login from "./components/LoginPage";
import InstituteList from "./components/InstituteList";
import RolesList from "./components/RolesList";

import PrivateRoute from "./private-routes/PrivateRoute";

import Dashboard from "./components/Dashboard";


function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  return (
    
      <div className={darkMode ? "app dark" : "app"}>
        <div className="main-container">
          
          

          <Routes>
            
            <Route path="/login" element={<Login darkMode={darkMode} setDarkMode={setDarkMode} />} />

            <Route
              path="/InstituteList"
              element={
                <PrivateRoute>
                  <InstituteList  darkMode={darkMode} setDarkMode={setDarkMode}/>
                </PrivateRoute>
              }
            />

            <Route
              path="/roles"
              element={
                <PrivateRoute>
                  <RolesList />
                </PrivateRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    
  );
}

export default App;