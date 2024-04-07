'use client'
import Image from "next/image";
import styles from "./slide.module.css";
import Link from "next/link";

const Slide = ({ slideData }) => {
  return (
    <div className={styles.slide}>
      <div className={styles.content}>
        <h2 className={styles.title}>{slideData.title}</h2>
        <p className={styles.description} dangerouslySetInnerHTML={{ __html: slideData.description }}></p>
        <div className={styles.actions}>
          {slideData.buttons.map((button, index) => (
            <Link href={button.href} key={index}>
              <button className={styles.button}>{button.label}</button>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.imageContainer}>
      <Image
        src={slideData.image}
        alt={slideData.title}
        fill
        className={styles.imgContainer}
        style={{ objectFit: "cover" }}
        priority={true}
        onError={(e) => {
            e.target.src = '/noavatar.png';
            console.error('Image failed to load:', e); // Log the error
      }}
/>
      </div>
    </div>
  );
};

export default Slide;
