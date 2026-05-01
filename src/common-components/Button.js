import "../css/components.css";

/**
 * Reusable Button Component
 * @param {string} className - Additional CSS classes
 * @param {string} variant - 'primary' | 'secondary' | 'ghost'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} fullWidth - Makes button 100% width
 * @param {boolean} disabled - Disables the button
 * @param {boolean} loading - Shows loading state
 * @param {React.ReactNode} children - Button content
 * @param {function} onClick - Click handler
 * @param {string} type - 'button' | 'submit' | 'reset'
 */
function Button({
  className = "",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  children,
  onClick,
  type = "button",
  ...props
}) {
  const baseClass = `btn btn-${variant} btn-${size}`;
  const widthClass = fullWidth ? "btn-full-width" : "";
  const disabledClass = disabled || loading ? "btn-disabled" : "";

  return (
    <button
      className={`${baseClass} ${widthClass} ${disabledClass} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading && (
        <span className="loader" style={{ marginRight: "8px" }}></span>
      )}
      {children}
    </button>
  );
}

export default Button;
