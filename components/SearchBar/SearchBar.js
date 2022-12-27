import React, { useState, useEffect } from 'react'; 
import styles from "./SearchBar.module.css";
import { Search } from 'react-feather';

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
      <button onClick={handleSearch}><Search size={20}/></button>
      <input 
        class={styles.SearchBox} 
        type="text" 
        value={searchTerm} onChange={handleChange} onKeyPress={handleKeyPress} 
        placeholder={"Search project name..."}
      />
    </div>
  );
}

export default SearchBar;