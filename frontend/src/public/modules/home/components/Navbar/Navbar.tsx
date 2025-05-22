import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    const handleLogin = () => {
        // Aquí puedes agregar la lógica de login
        console.log('Iniciar sesión clicked');
    };

    const handleRegister = () => {
        // Aquí puedes agregar la lógica de registro
        console.log('Registrarse clicked');
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.logo}>Tasked</div>
            
            <div className={styles.navCenter}>
                <div className={styles.navLinks}>
                    <a href="#features">Funciones</a>
                    <a href="#pricing">Precios</a>
                    <a href="#contact">Contacto</a>
                    <a href="#contact">Contacto</a>
                </div>
            </div>
            
            <div className={styles.authButtons}>
                <button 
                    className={styles.loginBtn}
                    onClick={handleLogin}
                >
                    Iniciar Sesión
                </button>
                <button 
                    className={styles.registerBtn}
                    onClick={handleRegister}
                >
                    Registrarse
                </button>
            </div>

            <div className={styles.mobileMenu} onClick={toggleMobileMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
};

export default Navbar;