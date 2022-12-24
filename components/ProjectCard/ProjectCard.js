import React from "react";
import styles from "./ProjectCard.module.css";
import { useRouter } from "next/router";
import { GitHub, Linkedin, Facebook, Twitter, Globe } from 'react-feather';

/*
  props {
    projectData: {
      ProjectName
      Category
      AwesomeNearLink 
      Series
      ABBV
      Icon
      Website Link
      Buy Link
      Stake Link
      DApp Link
      Facebook 
      Twitter
      Github
      Telegram
      Discord
      Linkedin
      Medium
      Other Links
      Near token
      Aurora Token
      Ethereum Token
      Other tokens
      Description
      Grants
      News Articles
    }
  }
*/
const ProjectCard = (props) => {

  // truncate text and add an ellipsis if needed
  const truncateText = (text, characters) => {
    if (!text) return "";
    return (`${text.substring(0, characters)}${text.length > characters ? "..." : ""}`);
  }

  const renderSocialIcons = () => {
    
    // social keys from the JSON file
    const keys = [
      "Website Link",
      "Twitter",
      "Github",
      "Facebook"
    ];

    // svg properties
    const width = 13;
    const color = "#b1b1b1";

    // build a tag with properties wrapped around a component
    const buildLink = (component, link) => {
      return (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          key={link}
        >
          {component}
        </a>
      );
    }

    return (
      <div className={styles.socialIconsContainer}>
        {keys.map((key, index) => {
          const value = props.projectData[key];
          if (key === "Website Link" && value)
            return buildLink(<Globe width={width} color={color}/>, value);
          else if (key === "Twitter" && value)
            return buildLink(<Twitter width={width} color={color}/>, value);
          else if (key === "Github" && value)
            return buildLink(<GitHub width={width} color={color}/>, value); 
          else if (key === "Linkedin" && value)
            return buildLink(<Linkedin width={width} color={color}/>, value);
          else if (key === "Facebook" && value)
            return buildLink(<Facebook width={width} color={color}/>, value);
          else return null;
        })}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.projectTitle}>
        <div className={styles.projectIconWrapper}>
          <img src={props.projectData.Icon}/>
        </div>
        <div className={styles.projectInfo}>
          <span className={styles.projectName}>{props.projectData.ProjectName}</span>
          <span className={styles.projectCategory}>{truncateText(props.projectData.Category, 20)}</span>
        </div>
      </div>
      <span className={styles.projectSubtitle}>{truncateText(props.projectData.Subtitle, 60)}</span>
      <div className={styles.projectLinks}>
        {renderSocialIcons()}
      </div>
    </div>
  );
};
export default ProjectCard;

