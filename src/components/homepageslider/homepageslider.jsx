'use client'
import { useState, useEffect } from 'react';

import styles from './homepageslider.module.css';
import Slide from '../slide/slide';

const HomeSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slideData = [
    {
      title: 'Welcome to Alfundex',
      description: '<b>Narrative Story chronicles Services for refugies, and Translations services.  </b><br />' +
      'We also Help Businesses and individuals to ship packages, find affordable good people ready to do any job very affordably',
      image: '/hero.gif',
      buttons: [
        { label: 'Learn More', href: '/services' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Send a package globally with us',
      description: '<b>Are you trying to send/receive a package in/from Africa, Europe?  </b><br />' +
      'We can helpyou send any package anywhere at a very affordabale price',
      image: '/shipping.jpg',
      buttons: [
        { label: 'Learn More', href: '/services/shipping' },
        { label: 'send package', href: '/services/shipping/send' },
      ],
    },

  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideData.length);
    }, 5000); // Slide changes every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % slideData.length);
  };

  const prevSlide = () => {
    setActiveSlide((current) => (current - 1 + slideData.length) % slideData.length);
  };

  return (
    <div className={styles.sliderContainer}>
      {slideData.map((slide, index) => (
        <Slide
          key={index}
          slideData={slide}
          isActive={activeSlide === index}
          className={`${styles.slide} ${activeSlide === index ? styles.active : ''}`}
        />
      ))}
      {/* Slider controls */}
      <button className={styles.prevBtn} onClick={prevSlide}>{"\u003C"}</button>
      <button className={styles.nextBtn} onClick={nextSlide}>{"\u003E"}</button>
    </div>
  );
};

export default HomeSlider;
