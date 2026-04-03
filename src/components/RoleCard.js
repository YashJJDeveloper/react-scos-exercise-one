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
    "Super Admin": "shield_person"
  };
 
  return (
    <div className="card-container" onClick={onClick}>
      
      <div className="card-left">
        
        <span className="material-symbols-outlined">
        {roleIconMap[name] || role_logo || "help"}
        </span>

        <div className="card-info">
          <h3>{name}</h3>
          <p>{getDescription()}</p>
        </div>
      </div>

      <div className="card-right">
        <div className="arrow-btn">›</div>
      </div>

    </div>
  );
}
export default RoleCard