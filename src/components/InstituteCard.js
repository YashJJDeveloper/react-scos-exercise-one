import "../css/card-style.css";
function InstituteCard(props) {
  return (
    <>
    {/* UI for Institute Card */}
      <div className="card-container">
        <div className="card-left">
          <img src={props.instLogo} alt="" />

          <div className="card-info">
            <h3>{props.name}</h3>
            <p>Mumbai, Maharashtra</p> 
          </div>
        </div>

        <div className="card-right">
          <span className="badge">School</span>
          <div className="arrow-btn">›</div>
        </div>
      </div>
    </>
  );
}
export default InstituteCard;
