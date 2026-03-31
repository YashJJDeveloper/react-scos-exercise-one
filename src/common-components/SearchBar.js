import "../css/card-style.css";

function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="search-box">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;