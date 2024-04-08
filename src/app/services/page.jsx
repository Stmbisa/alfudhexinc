import Services from "@/components/Services/Services";
import styles from "./Services.module.css";

const ServicesPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Services that we offer</h1>
      <div className={styles.servicesContainer}>
        <Services />
      </div>
    </div>
  );
};

export default ServicesPage;