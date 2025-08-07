import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SearchBar.css";

function SearchBar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/stocks/${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="search-form"
      style={{ width: "100%" }}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search courses, lessons, or topics..."
        className="search-input"
      />
    </form>
  );
}

export default SearchBar;
