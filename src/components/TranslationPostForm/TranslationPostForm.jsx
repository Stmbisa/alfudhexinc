'use client';

import React, { useState } from 'react';
import styles from './TranslationPostForm.module.css';

const TranslationPostForm = () => {
  const [formData, setFormData] = useState({
    originLanguage: '',
    currentLocation: '',
    contact: '',
    spokenLanguage: '',
    targetLanguage: '',
    story: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.DOMAIN}/api/translations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          originLanguage: formData.originLanguage,
          currentLocation: formData.currentLocation,
          contact: formData.contact,
          spokenLanguage: formData.spokenLanguage,
          targetLanguage: formData.targetLanguage,
          story: formData.story
        })
      });
      if (response.ok) {
        console.log('Translation request created successfully');
        // Handle successful submission (e.g., clear form, redirect)
      } else {
        console.error('Failed to create translation request');
        // Handle errors (e.g., display error message)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Request a Translation</h1>
      <div className={styles.formContainer}>
        <form onSubmit={submitHandler} className={styles.form}>
          <div>
            <label htmlFor="originLanguage" className={styles.label}>
              Origin Language
            </label>
            <input
              type="text"
              placeholder="Origin Language"
              name="originLanguage"
              value={formData.originLanguage}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div>
            <label htmlFor="currentLocation" className={styles.label}>
              Current Location
            </label>
            <input
              type="text"
              placeholder="Current Location"
              name="currentLocation"
              value={formData.currentLocation}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div>
            <label htmlFor="contact" className={styles.label}>
              Contact Information
            </label>
            <input
              type="text"
              placeholder="Contact Information"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div>
            <label htmlFor="spokenLanguage" className={styles.label}>
              Spoken Language
            </label>
            <input
              type="text"
              placeholder="Spoken Language"
              name="spokenLanguage"
              value={formData.spokenLanguage}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div>
            <label htmlFor="targetLanguage" className={styles.label}>
              Target Language
            </label>
            <input
              type="text"
              placeholder="Target Language"
              name="targetLanguage"
              value={formData.targetLanguage}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="story" className={styles.label}>
              Story or Text
            </label>
            <textarea
              placeholder="Story or Text to be translated"
              name="story"
              value={formData.story}
              onChange={handleChange}
              className={styles.textarea}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TranslationPostForm;