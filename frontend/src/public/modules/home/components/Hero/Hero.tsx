import React from 'react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
    return (
        <section className={styles.hero}>
        <h1>Organiza tu trabajo con más eficiencia que nunca</h1>
        <p>Tasked te ayuda a priorizar tareas, administrar flujos de trabajo y aumentar tu productividad con una interfaz intuitiva y potentes herramientas.</p>
        <div className={styles.ctaButtons}>
            <button className={styles.primaryBtn}>Comenzar gratis</button>
            <button className={styles.secondaryBtn}>Ver tutorial</button>
        </div>
        </section>
    );
};

export default Hero;