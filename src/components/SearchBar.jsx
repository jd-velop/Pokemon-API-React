import React from "react";

const SearchBar = ({ onSearch, onFetchRandom }) => {
  return (
    <div className="search-container">
      <form onSubmit={onSearch}>
        <input id="search-box" type="text" placeholder="Search Pokémon" />
        <button id="search-button" type="submit">
          Search
        </button>
      </form>
      <button id="fetch-button" onClick={onFetchRandom}>
        Fetch Random Pokémon
      </button>
    </div>
  );
};

export default SearchBar;