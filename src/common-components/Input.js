import { useState } from "react";
import "../css/components.css";

/**
 * Reusable Input Component
 * @param {string} type - 'text' | 'password' | 'email' | 'number'
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} label - Label text (optional)
 * @param {string} error - Error message (optional)
 * @param {boolean} required - Mark as required
 * @param {string} className - Additional CSS classes
 * @param {boolean} toggleable - Show/hide for password fields
 */
function Input({
  type = "text",
  placeholder = "",
  value = "",
  onChange,
  label,
  error,
  required = false,
  className = "",
  toggleable = false,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password" && toggleable;
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <div className={`input-wrapper ${error ? "input-error" : ""} ${className}`.trim()}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div className="input-container">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="input"
          {...props}
        />
        {isPasswordField && (
          <button
            type="button"
            className="toggle-password-btn"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <span className="material-symbols-outlined eye-icon">
              {showPassword ? "visibility" : "visibility_off"}
            </span>
          </button>
        )}
      </div>
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
}

export default Input;
