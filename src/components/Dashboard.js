import { useLocation } from "react-router-dom";
import "../css/dashboard.css";
import LogoutBtn from "../common-components/LogoutBtn";
function Dashboard() {
  const location = useLocation();

  const role = location.state;
  
  
  return (
    <>
      <div className="main-container">
        <div className="logout"> 
          <LogoutBtn/>
        </div>
        <div className="headings">
          <h1>Welcome to SchoolCoreOS</h1>
          
          <h2> {role.name} Panel</h2>
        </div>
        {/* Dashboard Cards */}
        <div className="card-grid">
          <div className="card card1" >
            <span className="card-number">08</span>
            <h1>Active Institutes</h1>
            <p>
              Institutes actively operating and using the platform for daily
              management
            </p>
          </div>
          <div className="card card2">
            <span className="card-number" >05</span>
            <h1>Inactive Institutes</h1>
            <p>
            Institutes currently inactive and not participating in system operations
            </p>
          </div>
          <div className="card card3">
            <span className="card-number">15+</span>
            <h1>Total Modules</h1>
            <p>
            Complete set of features enabling academic and administrative workflows
            </p>
          </div>
          <div className="card card4">
            <span className="card-number" >1.2k</span>
            <h1>Total Users</h1>
            <p>
            Total number of users registered across all managed institutes
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
