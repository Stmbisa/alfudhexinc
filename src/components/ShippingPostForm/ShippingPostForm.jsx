'use client';

import React, { useEffect, useState } from 'react';
import styles from './ShippingPostForm.module.css';

const ShippingPostForm = () => {
  const [formData, setFormData] = useState({
    packageType: '',
    pickupLocation: '',
    destinationCountry: ''
  });
  const [packageTypes, setPackageTypes] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const fetchPackageTypes = async () => {
      try {
        const response = await fetch(`${process.env.DOMAIN}/api/shipping/packageTypes`);
        const data = await response.json();
        setPackageTypes(data);
      } catch (error) {
        console.error('Error fetching package types:', error);
      }
    };
    setIsClient(true); // Set isClient to true after initial render
    fetchPackageTypes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const packageTypeId = e.target.packageType.value;
    try {
      const response = await fetch(`${process.env.DOMAIN}/api/shipping`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          packageType: packageTypeId,
          pickupLocation: formData.pickupLocation,
          destinationCountry: formData.destinationCountry
        })
      });
      if (response.ok) {
        console.log('Shipping request created successfully');
        // Handle successful submission (e.g., clear form, redirect)
      } else {
        console.error('Failed to create shipping request');
        // Handle errors (e.g., display error message)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Create a New Shipping Request</h1>
      <div className={styles.formContainer}>
        <form onSubmit={submitHandler} className={styles.form}>
          {isClient && packageTypes.length > 0 && (
            <div>
              <label htmlFor="packageType" className={styles.label}>
                Package Type
              </label>
              <select
                type="text"
                id="packageType"
                name="packageType"
                value={formData.packageType}
                onChange={handleChange}
                className={styles.input}
                required
              >
                {packageTypes.map((packageType) => (
                  <option key={packageType._id} value={packageType._id}>
                    {packageType.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label htmlFor="pickupLocation" className={styles.label}>
              Pickup Location
            </label>
            <input
              type="text"
              placeholder="Pickup Location"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="destinationCountry" className={styles.label}>
              Destination Country
            </label>
            <input
              type="text"
              placeholder="Destination Country"
              name="destinationCountry"
              value={formData.destinationCountry}
              onChange={handleChange}
              className={styles.input}
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

export default ShippingPostForm;