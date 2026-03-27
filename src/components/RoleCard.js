function RoleCard(props) {
  // UI for Role Cards
  return (
    <div className="card-container" onClick={props.onClick}>
      
      <div className="card-left">
        <img src={props.img} alt="role" />

        <div className="card-info">
          <h3>{props.name}</h3>
          <p>
            {props.name === "Admin"
              ? "Full system access"
              : props.name === "Teacher"
              ? "Class & grading"
              : "Child progress"}
          </p>
        </div>
      </div>

      <div className="card-right">
        <div className="arrow-btn">›</div>
      </div>

    </div>
  );
}
export default RoleCard