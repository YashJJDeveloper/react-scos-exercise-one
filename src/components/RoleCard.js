import Card from "../common-components/Card";

function RoleCard({ name, role_logo, onClick }) {
  const getDescription = () => {
    switch (name) {
      case "Admin":
        return "Full system access";
      case "Teacher":
        return "Class & grading";
      case "Parent":
        return "Child's progress";
      case "Student":
        return "Your progress";
      case "Institute Admin":
        return "Manage institute";
      case "Super Admin":
        return "Manage all institutes";
      default:
        return "Child progress";
    }
  };

  const roleIconMap = {
    Admin: "shield_person",
    Teacher: "menu_book",
    Parent: "group",
    Student: "Groups",
    "Institute Admin": "shield_person",
    "Super Admin": "shield_person",
  };

  return (
    <Card
      leftContent={
        <span className="material-symbols-outlined">
          {roleIconMap[name] || role_logo || "help"}
        </span>
      }
      title={name}
      subtitle={getDescription()}
      rightContent={<div className="arrow-btn">›</div>}
      onClick={onClick}
    />
  );
}

export default RoleCard;