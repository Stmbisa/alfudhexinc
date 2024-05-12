'use client';

import React, { useState, useEffect } from 'react';
import styles from './TranslationPostingPage.module.css';
import dynamic from 'next/dynamic';
import useCounter from '../useCounter';


const TranslationPostForm = dynamic(() => import('../TranslationPostForm/TranslationPostForm'), {
  ssr: false
});

const TranslationPostingPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const experienceYears = useCounter(0, 10, 4000); // Counts to 10 over 3 seconds
  const documentsTranslated = useCounter(0, 2000, 5000); // Counts to 2000 over 3 seconds
  const servicesTranslated = useCounter(0, 1000, 7000); // Counts to 1000 over 3 seconds
  const languagesAvailable = useCounter(0, 150, 10000); // Counts to 150 over 3 seconds

  return (
    <div className={styles.container}>
    <div suppressHydrationWarning className={styles.formContainer}>
        {isClient && <TranslationPostForm />}
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>We help you bridge the language gap</h1>
        <p className={styles.desc}>
          Stop struggling with language barriers and start communicating with ease. Easily access our translation services and provide the necessary details, including the origin language, current location, contact.
        </p>
        <h2>ARE YOU LOOKING FOR A TRANSLATOR?</h2>
        <p>We promise to help you find the best translators who can meet your needs.</p>
        <div className={styles.boxes}>
        <div className={styles.box}>
          <h1>{experienceYears} +</h1>
          <p>Years of experience</p>
        </div>
        <div className={styles.box}>
          <h1>{documentsTranslated} + </h1>
          <p>Documents translated</p>
        </div>
        <div className={styles.box}>
          <h1>{servicesTranslated} +</h1>
          <p>Services translated</p>
        </div>
        <div className={styles.box}>
          <h1>{languagesAvailable}+</h1>
          <p>Languages available</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default TranslationPostingPage;
