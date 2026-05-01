/**
 * Generic Data Card Component (for dashboard/stats)
 * @param {string} number - Large number/stat
 * @param {string} title - Card title
 * @param {string} description - Card description
 * @param {string} variant - 'blue' | 'green' | 'orange' | 'purple'
 * @param {function} onClick - Click handler
 * @param {string} className - Additional CSS classes
 */
function GenericCard({
  number,
  title,
  description,
  variant = "blue",
  onClick,
  className = "",
}) {
  return (
    <div
      className={`generic-card generic-card-${variant} ${className}`.trim()}
      onClick={onClick}
    >
      {number && <span className="card-number">{number}</span>}
      {title && <h1 className="card-title">{title}</h1>}
      {description && <p className="card-description">{description}</p>}
    </div>
  );
}

export default GenericCard;
