import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        if (window.scrollY > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.logo}>Tasked</div>
        <div className={styles.navLinks}>
            <a href="#features">Funciones</a>
            <a href="#testimonials">Testimonios</a>
            <a href="#pricing">Precios</a>
            <a href="#contact">Contacto</a>
        </div>
        <button className={styles.loginBtn}>Iniciar Sesión</button>
        </nav>
    );
};

export default Navbar;