import Link from "next/link";
import Image from "next/image";
import styles from "./homepageslider.module.css";

const HomePageSlider = () => {
    return (
        <div className={styles.container}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>Alfundex limited.</h1>
            <p className={styles.desc}>
               <b>Migrations Services, narrative chronicles Services for refugies, and Translations services.  </b><br />
                We also Help Businesses and individuals to ship packages, find affordable good people ready to do any job very affordably

            </p>
            <div className={styles.buttons}>
              <Link href="/services">
              <button className={styles.button}>Learn More</button>
              </Link>
              <Link href="/contact">
              <button className={styles.button}>Contact</button>
              </Link>
            </div>
          </div>
          <div className={styles.imgContainer}>
            <Image src="/hero.gif" alt="" fill className={styles.heroImg}/>
          </div>
        </div>
      );
    };

export default HomePageSlider;