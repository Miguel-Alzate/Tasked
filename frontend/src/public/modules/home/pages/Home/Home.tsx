import React from 'react';
import Navbar from '../../components/Navbar/Navbar.tsx';
import Hero from '../../components/Hero/Hero.tsx';
import BackgroundAnimation from '../../components/BackgroundAnimation/BackgroundAnimation.tsx';
import Features from '../../components/Features/Features.tsx';
import Testimonials from '../../components/Testimonials/Testimonials.tsx';
import CtaSection from '../../components/CtaSection/CtaSection.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import styles from './Home.module.css';

// Ejemplo de props para Testimonials
const testimonialsData = [
  {
    content: "¡Esta app me ayudó a organizar mi día a día!",
    authorName: "Juan Pérez",
    authorRole: "Desarrollador",
    authorImage: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    content: "La mejor herramienta para equipos remotos.",
    authorName: "Ana Gómez",
    authorRole: "Project Manager",
    authorImage: "https://randomuser.me/api/portraits/women/2.jpg"
  }
];

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
        { text: "Precios", url: "#" }
      ]
    },
    {
      title: "Compañía",
      links: [
        { text: "Sobre nosotros", url: "#" },
        { text: "Contacto", url: "#" }
      ]
    }
  ],
  socialLinks: [
    { name: "Twitter", url: "https://twitter.com", icon: <span>🐦</span> },
    { name: "LinkedIn", url: "https://linkedin.com", icon: <span>💼</span> }
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
      <Testimonials 
        title="Testimonios"
        subtitle="Lo que dicen nuestros usuarios"
        testimonials={testimonialsData}
      />
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