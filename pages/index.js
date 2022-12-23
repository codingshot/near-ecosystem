/* eslint-disable @next/next/no-html-link-for-pages */
import styles from "../styles/Deck.module.css";
// import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
export default function Home() {
  return (
    <div className={styles.container}>
      <Layout pageTitle="NEAR Projects" />
      <iframe
        className="clickup-embed clickup-dynamic-height"
        src="https://docs.google.com/forms/d/e/1FAIpQLSc-K4T8aB42ncEAa98XX6I5Rwt0AQ6xU4BFtQFY_WsVmP5QXw/viewform"
      ></iframe>
    </div>
  );
}
