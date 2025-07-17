import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SearchBar.css";
function SearchBar() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleSubmit = async () => {
    navigate(`/stocks/${searchText}`);
  };

  return (
    <div className="search-bar-container">
      {/* <h1>Search</h1> */}

      <form onSubmit={handleSubmit} className="search-form">
        <label>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="SEARCH FOR A COURSE"
            className="search-input"
          />
        </label>

        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
