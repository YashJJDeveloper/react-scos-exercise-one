import Card from "../common-components/Card";

function InstituteCard({ instLogo, name }) {
  return (
    <Card
      image={instLogo}
      title={name}
      subtitle="Mumbai, Maharashtra"
      badge="School"
      rightContent={<div className="arrow-btn">›</div>}
    />
  );
}

export default InstituteCard;
