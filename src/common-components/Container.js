/**
 * Reusable Container Component
 * @param {string} className - Additional CSS classes
 * @param {string} maxWidth - 'full' | 'sm' | 'md' | 'lg' | 'xl'
 * @param {React.ReactNode} children - Container content
 * @param {string} type - 'flex' | 'grid' | 'block'
 * @param {string} direction - 'row' | 'col' (for flex)
 */
function Container({
  className = "",
  maxWidth = "lg",
  children,
  type = "block",
  direction = "col",
  ...props
}) {
  const widthClass = {
    full: "container-full",
    xs: "container-xs",
    sm: "container-sm",
    md: "container-md",
    lg: "container-lg",
    xl: "container-xl",
  }[maxWidth];

  const typeClass = {
    flex: `flex flex-${direction}`,
    grid: "grid",
    block: "block-container",
  }[type];

  return (
    <div className={`${typeClass} ${widthClass} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export default Container;
