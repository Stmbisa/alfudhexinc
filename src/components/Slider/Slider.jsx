"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Description from '../Description/Description';
import styles from './Slider.module.css';
import { images } from '../constants/constants';

const Slider = () => {
  const [activeImage, setActiveImage] = useState(0);

  const clickNext = () => {
    activeImage === images.length - 1
      ? setActiveImage(0)
      : setActiveImage(activeImage + 1);
  };

  const clickPrev = () => {
    activeImage === 0
      ? setActiveImage(images.length - 1)
      : setActiveImage(activeImage - 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      clickNext();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [activeImage]);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderImageContainer}>
        {images.map((elem, idx) => (
          <div
            key={idx}
            className={`${styles.sliderImage} ${
              idx === activeImage ? styles.active : styles.hidden
            }`}
          >
            <Image
              src={elem.src}
              alt=""
              width={400}
              height={400}
              priority
              className={styles.sliderImageSize}
            />
          </div>
        ))}
      </div>
      <Description
        activeImage={activeImage}
        clickNext={clickNext}
        clickPrev={clickPrev}
      />
    </div>
  );
};

export default Slider;