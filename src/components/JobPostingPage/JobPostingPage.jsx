'use client';
import React from 'react';
import JobPostForm from '../JobPostForm/JobPostForm';
import styles from './JobPostingPage.module.css';

const JobPostingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <JobPostForm />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>We help you to focus on what you can do best</h1>
        <p className={styles.desc}>
          Stop the guesswork and start finding the right people with confidence. Easily access any jop pros and select , with unmatched prices, we have customized hiring stages, interview guides, and more, so you can repeat and perfect your team building process and grow your business one step at a time.
          <h1>ARE YOU AN EMPLOYER?</h1>
          We promise to help you find the best employees who really are able to meet the Opportinity
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
    </div>
  );
};

export default JobPostingPage;