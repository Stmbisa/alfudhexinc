'use client';
import React, { useEffect, useState } from 'react';
import styles from './JobPostForm.module.css';

import { useRouter } from "next/navigation";




const JobPostForm = () => {
  const router = useRouter(); // Initialize useRouter
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    location: '',
    pricePerHour: 0,
    estimatedHours: 0,
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // State for error messages

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/jobs/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'pricePerHour' || name === 'estimatedHours' ? Number(value) : value
    }));
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Job created successfully');
        router.push('services/jobs'); // Redirect to the jobs page after successful submission
      } else {
        const errorData = await response.json(); // if API sends error details as JSON
        setError(errorData.error || 'Failed to create job. Please try again.'); // Use API error or generic message
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Post a New Job</h1>
      {error && <div className={styles.error}>{error}</div>} {/* Display error messages */}
        <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {Array.isArray(categories) && categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="location">Location for the job</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="pricePerHour">Price per Hour</label>
          <input
            type="number"
            id="pricePerHour"
            name="pricePerHour"
            value={formData.pricePerHour}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="estimatedHours">Estimated Hours</label>
          <input
            type="number"
            id="estimatedHours"
            name="estimatedHours"
            value={formData.estimatedHours}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default JobPostForm;