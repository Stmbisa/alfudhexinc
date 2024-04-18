import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Alfudhex </div>
      <div className={styles.text}>
        Alfudhex © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
