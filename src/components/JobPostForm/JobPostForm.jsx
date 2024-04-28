'use client';

import React, { useEffect, useState } from 'react';
import styles from './JobPostForm.module.css';

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    location: '',
    pricePerHour: 0,
    estimatedHours: 0,
  });

  const [categories, setCategories] = useState([]); // State to store fetched categories

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.DOMAIN}/api/jobs/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
  e.preventDefault();

  const categoryId = e.target.category.value; // Get selected category ID

  try {
    const response = await fetch(`${process.env.DOMAIN}/api/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category: categoryId,
        title: formData.title,
        description: formData.description,
        location: formData.location,
        pricePerHour: formData.pricePerHour,
        estimatedHours: formData.estimatedHours,
      }),
    });

    if (response.ok) {
      console.log('Job created successfully');
      // Handle successful submission (e.g., clear form, redirect)
    } else {
      console.error('Failed to create job');
      // Handle errors (e.g., display error message)
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Post a New Job</h2>
      <form onSubmit={submitHandler} className={styles.form}>
        {/* Render input fields for each job data field */}
        {/* Example: */}

          {categories.length > 0 && (
            <div className={styles.formGroup}>
              <label htmlFor="category" className={styles.label}>
                category
              </label>
              <select
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={styles.input}
                required
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}

        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="location" className={styles.label}>
            location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="pricePerHour" className={styles.label}>
            pricePerHour
          </label>
          <input
            type="text"
            id="pricePerHour"
            name="pricePerHour"
            value={formData.pricePerHour}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="estimatedHours" className={styles.label}>
            estimatedHours
          </label>
          <input
            type="text"
            id="estimatedHours"
            name="estimatedHours"
            value={formData.estimatedHours}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        {/* Repeat for other fields */}
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default JobPostForm;