import "../css/navbar-style.css";

function ThemeSwitcher({ darkMode, setDarkMode }) {
  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);

    // save to localStorage
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <button className="toggle-mode" onClick={toggleTheme}>
      <span className="material-symbols-outlined theme-icon">
        {darkMode ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}

export default ThemeSwitcher;