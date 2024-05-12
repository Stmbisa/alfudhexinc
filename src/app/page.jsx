import React from 'react';
import Slider from '@/components/Slider/Slider';
import JobPostingPage from '@/components/JobPostingPage/JobPostingPage';
import styles from './home.module.css';
import ShippingPostingPage from '@/components/ShippingPostingPage/ShippingPostingPage';
import TranslationPostingPage from '@/components/TranslationPostingPage/TranslationPostingPage';

const Home = () => {
  return (
    <main className={styles.homeContainer}>
      <div className={styles.sliderContainer}>
        <Slider />
      </div>
      <div className={styles.jobPostingContainer}>
        <h1 className={styles.subtitle}>A flexible Job Hiring Platform</h1>
        <JobPostingPage />
      </div>
      <div className={styles.jobPostingContainer}>
        <h1 className={styles.subtitle}>An Unbeatable Shipping Platform</h1>
        <ShippingPostingPage />
      </div>
      <div className={styles.jobPostingContainer}>
        <h1 className={styles.subtitle}>Translate any language to any language and tell any story</h1>
        <TranslationPostingPage />
      </div>
    </main>
  );
};

export default Home;