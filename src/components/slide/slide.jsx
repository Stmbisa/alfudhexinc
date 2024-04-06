'use client'
import Image from "next/image";
import styles from "./slide.module.css";
import Link from "next/link";

const Slide = ({ slideData }) => {
  return (
    <div className={styles.slide}>
      <div className={styles.content}>
        <h2 className={styles.title}>{slideData.title}</h2>
        <p className={styles.description}>{slideData.description}</p>
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
            fill // To eplace layout="fill" isee if the error goes
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            style={{ objectFit: "cover" }} // This replaces objectFit="cover" for next 13
            priority={true}
            onError={(e) => {
                e.target.src = '/noavatar.png';
            }}
        />
      </div>
    </div>
  );
};

export default Slide;
