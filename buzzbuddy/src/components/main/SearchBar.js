import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      className="search-bar"
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search Posts"
    />
  );
}

export default SearchBar;
