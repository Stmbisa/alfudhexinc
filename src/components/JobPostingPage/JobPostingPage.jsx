'use client';
import React, { useState } from 'react';
import styles from './JobPostingPage.module.css';
import dynamic from 'next/dynamic';
import useCounter from '../useCounter';

const JobPostForm = dynamic(() => import('../JobPostForm/JobPostForm'), {
  ssr: false,
});

const JobPostingPage = () => {
  const [isClient, setIsClient] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const experienceYears = useCounter(0, 4, 3000);
  const jobsCompleted = useCounter(0, 3000, 5000); // Counts to 3 over 3 seconds
  const usersReady = useCounter(0, 10000, 10000); // Counts to 150 over 3 seconds

  return (
    <div className={styles.container}>
      <div suppressHydrationWarning className={styles.formContainer}>
        {isClient && <JobPostForm />}
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
            <h1>{experienceYears} +</h1>
            <p>Years of experience</p>
          </div>
          <div className={styles.box}>
            <h1>{jobsCompleted} +</h1>
            <p>Jobs completed</p>
          </div>
          <div className={styles.box}>
            <h1>{usersReady}+</h1>
            <p>of users ready for Jobs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingPage;