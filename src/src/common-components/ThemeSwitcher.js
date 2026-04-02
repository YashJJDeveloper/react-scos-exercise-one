import "../css/navbar-style.css"
function ThemeSwitcher({ darkMode, setDarkMode }) {
    const toggleTheme = () => {
      const newTheme = !darkMode;
      setDarkMode(newTheme);
  
      // save to localStorage
      localStorage.setItem("theme", newTheme ? "dark" : "light");
    };
  
    return (
      <button className="toggle-mode" onClick={toggleTheme}>
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    );
  }
  
  export default ThemeSwitcher;