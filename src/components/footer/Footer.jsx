import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Alfundex</div>
      <div className={styles.text}>
        Alfundex © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
