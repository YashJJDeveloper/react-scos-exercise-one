/**
 * Reusable Page Header Component
 * @param {string} title - Main title
 * @param {string} subtitle - Secondary subtitle
 * @param {string} align - 'left' | 'center' | 'right'
 * @param {string} className - Additional CSS classes
 */
function Header({ title, subtitle, align = "center", className = "" }) {
  return (
    <div className={`page-header text-${align} ${className}`.trim()}>
      {title && <h1 className="header-title">{title}</h1>}
      {subtitle && <p className="header-subtitle">{subtitle}</p>}
    </div>
  );
}

export default Header;
