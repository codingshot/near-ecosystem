import styles from "../styles/Deck.module.css";
import Layout from "../components/Layout";

const deck = () => {
  return (
    <div className={styles.container}>
      <Layout pageTitle="Embed A Deck" />
      <iframe
        src=""
        frameBorder="0"
        width="1440"
        height="839"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default deck;