import React from 'react';
import styles from './BackgroundAnimation.module.css';

const BackgroundAnimation: React.FC = () => {
    return (
        <div className={styles.bgAnimation}>
        <div className={styles.glow}></div>
        <div className={styles.glow}></div>
        <div className={styles.glow}></div>
        </div>
    );
};

export default BackgroundAnimation;