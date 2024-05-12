'use client';

import React, { useState } from 'react';
import styles from './ShippingPostingPage.module.css';
import dynamic from 'next/dynamic';
import useCounter from '../useCounter';

const ShippingPostForm = dynamic(() => import('../ShippingPostForm/ShippingPostForm'), {
    ssr: false
});

const ShippingPostingPage = () => {
    const [isClient, setIsClient] = useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    const experienceYears = useCounter(0, 5, 3000);
    const packageShipped = useCounter(0, 13000, 7000); // Counts to 3 over 3 seconds
    const destinations = useCounter(0, 100, 10000); // Counts to 150 over 3 seconds

    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>We help you to ship your packages safely</h1>
                <p className={styles.desc}>
                    Stop worrying about your packages and start shipping with confidence. Easily access our shipping services and select the package type, with unmatched prices and reliable delivery, we have customized shipping stages and tracking, so you can repeat and perfect your shipping process and reach your customers seamlessly.
                    <h1>ARE YOU A SHIPPER?</h1>
                    We promise to help you ship your packages securely and on time.
                </p>
                <div className={styles.boxes}>
                    <div className={styles.box}>
                        <h1>{experienceYears} +</h1>
                        <p>Years of experience</p>
                    </div>
                    <div className={styles.box}>
                        <h1>{packageShipped}+</h1>
                        <p>Packages shipped</p>
                    </div>
                    <div className={styles.box}>
                        <h1>{destinations}+</h1>
                        <p>Shipping destinations worldwide</p>
                    </div>
                </div>
            </div>
            <div suppressHydrationWarning className={styles.formContainer}>
                {isClient && <ShippingPostForm />}
            </div>
        </div>
    );
};

export default ShippingPostingPage;