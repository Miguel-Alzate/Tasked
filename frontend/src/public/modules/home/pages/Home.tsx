import React from 'react';
import Navbar from '../../home/components/Navbar/Navbar.tsx';
import Hero from '../../home/components/Hero/Hero.tsx';
import BackgroundAnimation from '../../home/components/BackgroundAnimation/BackgroundAnimation.tsx';
import Features from '../../home/components/Features/Features.tsx';
import CtaSection from '../../home/components/CtaSection/CtaSection.tsx';
import Footer from '../../home/components/Footer/Footer.tsx';
import styles from './Home.module.css';

// Ejemplo de props para CtaSection
const ctaProps = {
  title: "¿Listo para ser más productivo?",
  description: "Empieza a usar Tasked hoy mismo y lleva tu organización al siguiente nivel.",
  buttonText: "Comenzar ahora",
  onButtonClick: () => alert('¡Gracias por unirte!')
};

// Ejemplo de props para Footer
const footerProps = {
  brandName: "Tasked",
  brandDescription: "Organiza tus tareas y proyectos fácilmente.",
  linkGroups: [
    {
      title: "Producto",
      links: [
        { text: "Características", url: "#" },
        { text: "Tutorial", url: "#" },
        { text: "Empezar ahora", url: "#" }
      ]
    },
    {
      title: "Compañía",
      links: [
        { text: "Sobre nosotros", url: "#" },
        { text: "Contacto", url: "#" }
      ]
    },
    {
      title: "lorem",
      links: [
        { text: "lorem", url: "#" },
        { text: "lorem", url: "#" }
      ]
    }
  ],
  socialLinks: [
    { name: "Twitter", url: "https://twitter.com", icon: <span>🐦</span> },
    { name: "LinkedIn", url: "https://linkedin.com", icon: <span>💼</span> },
    { name: "Github", url: "https://github.com", icon: <span>🐙</span> },
    { name: "Instagram", url: "https://instagram.com", icon: <span>📸</span> }
  ],
  copyrightText: "© 2025 Tasked. Todos los derechos reservados."
};

const Home: React.FC = () => {
  return (
    <div className={styles.homepage}>
      <Navbar />
      <Hero />
      <BackgroundAnimation />
      <Features />
      <CtaSection 
        title={ctaProps.title}
        description={ctaProps.description}
        buttonText={ctaProps.buttonText}
        onButtonClick={ctaProps.onButtonClick}
      />
      <Footer
        brandName={footerProps.brandName}
        brandDescription={footerProps.brandDescription}
        linkGroups={footerProps.linkGroups}
        socialLinks={footerProps.socialLinks}
        copyrightText={footerProps.copyrightText}
      />
    </div>
  );
};

export default Home;