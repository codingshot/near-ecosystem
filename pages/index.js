/* eslint-disable @next/next/no-html-link-for-pages */
import styles from "../styles/Deck.module.css";
import React from 'react'; 
// import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import ProjectCardsContainer from "../components/ProjectCardsContainer/ProjectCardsContainer";

export default function Home() {
  // const prettifiedData = JSON.stringify(data, null, 2);
  
  return (
    <div className={styles.container}>
      <Layout pageTitle="NEAR Projects" />
      <div className={styles.pageHeader}>
         <h1>Projects on NEAR</h1>
         <p>Decentralized list of projects being built on NEAR Protocol and the Aurora chain</p>
      </div>
      <ProjectCardsContainer/>
    </div>
  );
}
