/* eslint-disable @next/next/no-html-link-for-pages */
import styles from "../styles/Deck.module.css";
// import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import data from "../data/combineddata.json";
export default function Home() {
  const prettifiedData = JSON.stringify(data, null, 2);

  return (
    <div className={styles.container}>
      <Layout pageTitle="NEAR Projects" />
      <div>
         <h1>Projects on NEAR</h1>
        <pre>{prettifiedData}</pre>
      </div>
    </div>
  );
}
