import React, { useState, useEffect } from 'react'; 
import styles from "./ProjectCardsContainer.module.css";
import data from "../../data/combineddata.json";
import ProjectCard from "../ProjectCard/ProjectCard";

const ProjectCardsContainer  = () => {

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
    return (
      [...data].slice(0, lastProject).map((projectData, index) => {
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
    <div className={styles.projectCardsContainer}>
      {renderProjectCards()}
    </div>
  );
}

export default ProjectCardsContainer;