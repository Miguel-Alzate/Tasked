import React, { useState, useEffect } from 'react';
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className={styles.ctaSection}>
      {/* Main CTA Container */}
      <div className={styles.ctaContainer}>
        {/* Badge */}
        <div className={styles.badge}>
          <div className={styles.badgeIndicator}></div>
          <span className={styles.badgeText}>¡Únete a +10,000 usuarios activos!</span>
        </div>

        {/* Main heading */}
        <h3 className={styles.mainHeading}>
          <span className={styles.gradientText}>{title}</span>
        </h3>

        {/* Subtitle */}
        <p className={styles.subtitle}>{description}</p>

        {/* Stats row */}
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>99%</div>
            <div className={styles.statLabel}>Satisfacción</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>24/7</div>
            <div className={styles.statLabel}>Soporte</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>500+</div>
            <div className={styles.statLabel}>Integraciones</div>
          </div>
        </div>

        {/* Enhanced CTA Button */}
        <div className={styles.buttonContainer}>
          <div className={styles.buttonGlow}></div>
          <button
            onClick={onButtonClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={styles.primaryBtn}
          >
            <span className={styles.buttonContent}>
              {buttonText}
              <svg 
                className={`${styles.buttonIcon} ${isHovered ? styles.iconMoved : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className={styles.shimmerEffect}>
              <div className={`${styles.shimmer} ${isHovered ? styles.shimmerActive : ''}`}></div>
            </div>
          </button>
        </div>

        {/* Security badges */}
        <div className={styles.securityBadges}>
          <div className={styles.securityItem}>
            <svg className={styles.securityIcon} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            SSL Seguro
          </div>
          <div className={styles.securityItem}>
            <svg className={styles.securityIcon} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Certificado
          </div>
          <div className={styles.securityItem}>
            <svg className={styles.securityIcon} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Garantía 30 días
          </div>
        </div>
      </div>

      {/* Mouse follower effect */}
      <div 
        className={styles.mouseFollower}
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      ></div>
    </section>
  );
};

export default CTASection;