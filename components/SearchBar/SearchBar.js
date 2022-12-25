import React, { useState, useEffect } from 'react'; 
import styles from "./SearchBar.module.css";
import data from "../../data/combineddata.json";
import ProjectCard from "../ProjectCard/ProjectCard";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');
  function handleKeyPress(event) {
    if (event.key === 'Enter') {  // trigger search on Enter key press
      props.onSearch(searchTerm);
    }
  }
  function handleChange(event) {
    setSearchTerm(event.target.value);
    props.onSearch(searchTerm);  // trigger search on key press
  }

  function handleSearch() {
    props.onSearch(searchTerm);
  }

  return (
    <div class={styles.SearchBar}>
      <input class={styles.SearchBox} type="text" value={searchTerm} onChange={handleChange} onKeyPress={handleKeyPress} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;