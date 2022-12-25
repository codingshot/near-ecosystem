import React, { useState, useEffect } from 'react'; 
import styles from "./ProjectCardsContainer.module.css";
import data from "../../data/combineddata.json";
import ProjectCard from "../ProjectCard/ProjectCard";
import SearchBar from "../SearchBar/SearchBar";

const ProjectCardsContainer  = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastProject, setLastProject] = useState(100);

  useEffect(() => {
    // update lastProject ID in the array for infinity scrolling
    const handleScroll = () => {
      if (window.innerHeight + document.scrollingElement.scrollTop > document.body.offsetHeight) {
        setLastProject(Math.min(lastProject + 100, data.length));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastProject]);

  // render cards within range
  const renderProjectCards = () => {
      // filter data based on searchTerm

    const filteredData = data.filter(item => {
      if (item.ProjectName) {  // check if item.ProjectName is not null or undefined
        return item.ProjectName.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });
    return (
      filteredData.slice(0, lastProject).map((projectData, index) => {
        if (projectData.ProjectName)
          return (
            <ProjectCard 
              projectData={projectData} 
              key={index}
            />
          )
      })
    );
  }

  return (
    <div className={styles}>
      <SearchBar onSearch={setSearchTerm} /> 
        <div className={styles.projectCardsContainer}>
        
          {renderProjectCards()}
        </div>
    </div>
  );
}

export default ProjectCardsContainer;