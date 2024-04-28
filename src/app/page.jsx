import React from 'react';
import Slider from '@/components/Slider/Slider';
import JobPostingPage from '@/components/JobPostingPage/JobPostingPage';
import styles from './home.module.css';

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
    </main>
  );
};

export default Home;