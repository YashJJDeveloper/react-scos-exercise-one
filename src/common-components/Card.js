/**
 * Reusable Card Component (for generic list items)
 * @param {React.ReactNode} leftContent - Left side content
 * @param {React.ReactNode} rightContent - Right side content (optional)
 * @param {string} title - Card title
 * @param {string} subtitle - Card subtitle
 * @param {string} image - Image URL
 * @param {function} onClick - Click handler
 * @param {string} badge - Badge text (optional)
 * @param {string} className - Additional CSS classes
 */
function Card({
  leftContent,
  rightContent,
  title,
  subtitle,
  image,
  onClick,
  badge,
  className = "",
}) {
  return (
    <div className={`card card-container ${className}`.trim()} onClick={onClick}>
      <div className="card-left">
        {image && <img src={image} alt={title} className="card-image" />}
        {leftContent && <div className="card-left-content">{leftContent}</div>}
        {(title || subtitle) && (
          <div className="card-info">
            {title && <h3>{title}</h3>}
            {subtitle && <p>{subtitle}</p>}
          </div>
        )}
      </div>

      <div className="card-right">
        {badge && <span className="card-badge">{badge}</span>}
        {rightContent && <div className="card-right-content">{rightContent}</div>}
      </div>
    </div>
  );
}

export default Card;
