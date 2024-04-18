import Image from "next/image";
import styles from "./about.module.css";

export const metadata = {
  title: "About Page",
  description: "About description",
};


const AboutPage = () => {

  // console.log("lets check where it works")
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About Agency</h2>
        <h1 className={styles.title}>
          We create Opportinities refugies, employers that are safer
        </h1>
        <p className={styles.desc}>
          We are Alfudhex a platform that helpes you solve all your immigrations issues at the lowest prices,
          from hemping you get asylum or visa, to telling your story in the best language possible (narrative chrincles)
          to sending your package anywhere in the world, to finding you a job!
          we have a vast team of consultants.
          <h1>ARE YOU AN EMPLOYER?</h1>
          We promise to help you find the best employees who really need Opportinities, do well while doing good
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>4 +</h1>
            <p>Years of experience</p>
          </div>
          <div className={styles.box}>
            <h1>3 K+</h1>
            <p>Jobs complted of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>of users ready for Jobs</p>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image
          src="/about.jpg"
          alt="About Image"
          fill
          className={styles.img}
        />
      </div>
    </div>
  );
};

export default AboutPage;
