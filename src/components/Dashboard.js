import { useLocation } from "react-router-dom";
import "../css/dashboard.css";
import LogoutBtn from "../common-components/LogoutBtn";
import GenericCard from "../common-components/GenericCard";
import Header from "../common-components/Header";

function Dashboard() {
  const location = useLocation();
  const role = location.state;

  const dashboardCards = [
    {
      number: "08",
      title: "Active Institutes",
      description:
        "Institutes actively operating and using the platform for daily management",
      variant: "blue",
    },
    {
      number: "05",
      title: "Inactive Institutes",
      description:
        "Institutes currently inactive and not participating in system operations",
      variant: "green",
    },
    {
      number: "15+",
      title: "Total Modules",
      description:
        "Complete set of features enabling academic and administrative workflows",
      variant: "orange",
    },
    {
      number: "1.2k",
      title: "Total Users",
      description:
        "Total number of users registered across all managed institutes",
      variant: "purple",
    },
  ];

  return (
    <div className="main-container">
      <div >
        <LogoutBtn />
      </div>

      <Header
        title="Welcome to SchoolCoreOS"
        subtitle={`${role?.role_name} Panel`}
        align="center"
      />

      {/* Dashboard Cards Grid */}
      <div className="card-grid">
        {dashboardCards.map((card, index) => (
          <GenericCard
            key={index}
            number={card.number}
            title={card.title}
            description={card.description}
            variant={card.variant}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
