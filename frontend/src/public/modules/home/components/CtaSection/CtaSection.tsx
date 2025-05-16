import React from 'react';
import styles from './CTASection.module.css';

interface CTASectionProps {
    title: string;
    description: string;
    buttonText: string;
    onButtonClick?: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ 
    title, 
    description, 
    buttonText,
    onButtonClick 
    }) => {
    return (
        <section className={styles.ctaSection}>
        <div className={styles.ctaBox}>
            <h2>{title}</h2>
            <p>{description}</p>
            <button 
            className={styles.primaryBtn} 
            onClick={onButtonClick}
            >
            {buttonText}
            </button>
        </div>
        </section>
    );
};

export default CTASection;