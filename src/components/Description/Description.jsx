"use client"

import React from 'react';
import Image from 'next/image';
import styles from './Description.module.css';
import images from '../constants/constants';
import Link from 'next/link';

const Description = ({ activeImage, clickNext, clickPrev }) => {
  return (
    <div className={styles.descriptionContainer}>
      <div className={styles.alfundexlabel}>ALFUNDEX</div>
      {images.map((elem, idx) => (
        <div
          key={idx}
          className={`${styles.descriptionContent} ${
            idx === activeImage ? styles.active : styles.hidden
          }`}
        >
          <div className={styles.descriptionText}>
            <div className={styles.title}>{elem.title}</div>
            <div className={styles.desc} dangerouslySetInnerHTML={{ __html: elem.desc }} />
          </div>
          <div className={styles.buttonContainer}>
            {elem.buttons.map((button, index) => (
                <Link href={button.href} key={index}>
                  <button className={styles.blueButton}>{button.label}</button>
                </Link>
            ))}
          </div>

          <div className={styles.sliderControls}>
            <div className={styles.prevButton} onClick={clickPrev}>
              <Image src= 'left.svg' alt="" width={24} height={24} />
            </div>
            <div className={styles.nextButton} onClick={clickNext}>
               <Image src='right.svg' alt="" width={24} height={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Description;