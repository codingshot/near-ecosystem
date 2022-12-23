import styles from "../styles/Deck.module.css";
import Layout from "../components/Layout";

const Embed = () => {
  return (
    <div className={styles.container}>
      <Layout pageTitle="Embed" />
      <iframe
        className="clickup-embed clickup-dynamic-height"
        src=""
      ></iframe>
    </div>
  );
};

export default Embed;
