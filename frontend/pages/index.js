/* eslint-disable @next/next/no-html-link-for-pages */
import styles from "../styles/Deck.module.css";
// import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
export default function Home() {
  return (
    <div className={styles.container}>
      <Layout pageTitle="Embed" />
      <iframe
        className="clickup-embed clickup-dynamic-height"
        src=""
      ></iframe>
    </div>
  );
}
