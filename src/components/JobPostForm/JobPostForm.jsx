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
  const [categories, setCategories] = useState([]);
  const [isClient, setIsClient] = useState(false);

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
    setIsClient(true); // Set isClient to true after initial render
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const categoryId = e.target.category.value;
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
      <h1 className={styles.heading}>Post a New Job</h1>
      <div className={styles.formContainer}>
        <form onSubmit={submitHandler} className={styles.form}>
          {isClient && categories.length > 0 && (
            <div>
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
          <div>
            <label htmlFor="title" className={styles.label}>
              Title
            </label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Description </label>
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.input}
            required
          />
          </div>

          <label htmlFor="location" className={styles.label}>Location for the job </label>
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <label htmlFor="pricePerHour" className={styles.label}>Price per Hour </label>
          <input
            type="number"
            placeholder="Price Per Hour"
            name="pricePerHour"
            value={formData.pricePerHour}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <label htmlFor="estimatedHours" className={styles.label}>Estimated Hours </label>
          <input
            type="number"
            placeholder="Estimated Hours"
            name="estimatedHours"
            value={formData.estimatedHours}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPostForm;