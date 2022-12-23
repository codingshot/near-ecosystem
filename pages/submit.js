import styles from "../styles/Deck.module.css";
import Layout from "../components/Layout";

const Submit = () => {
  return (
    <div className={styles.container}>
      <Layout pageTitle="Submit A Project" />
      <iframe
        className="clickup-embed clickup-dynamic-height"
        src="https://docs.google.com/forms/d/e/1FAIpQLSc-K4T8aB42ncEAa98XX6I5Rwt0AQ6xU4BFtQFY_WsVmP5QXw/viewform"
      ></iframe>
    </div>
  );
};

export default Submit;
