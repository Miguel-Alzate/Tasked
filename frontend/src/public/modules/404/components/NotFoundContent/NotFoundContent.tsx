import React from 'react';
import styles from './NotFoundContent.module.css';

const NotFoundContent = () => {
    return (
        <div className={styles.innerContent}>
        <h1 className={styles.heading}>404</h1>
        <p className={styles.subheading}>
            Looks like the page you were looking for is no longer here.
        </p>
        </div>
    );
};

export default NotFoundContent;