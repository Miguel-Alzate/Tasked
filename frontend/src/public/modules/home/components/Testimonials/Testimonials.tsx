import React from 'react';
import styles from './Testimonials.module.css';

interface TestimonialProps {
    content: string;
    authorName: string;
    authorRole: string;
    authorImage?: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ 
    content, 
    authorName, 
    authorRole,
    authorImage 
    }) => {
    return (
        <div className={styles.testimonialCard}>
        <div className={styles.testimonialContent}>
            <p>{content}</p>
        </div>
        <div className={styles.testimonialAuthor}>
            <div className={styles.authorAvatar}>
            <img src={authorImage || ""} alt={authorName} />
            </div>
            <div className={styles.authorInfo}>
            <h4>{authorName}</h4>
            <p>{authorRole}</p>
            </div>
        </div>
        </div>
    );
};

interface TestimonialsProps {
    title: string;
    subtitle: string;
    testimonials: TestimonialProps[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ title, subtitle, testimonials }) => {
    return (
        <section className={styles.testimonials} id="testimonials">
        <div className={styles.sectionTitle}>
            <h2>{title}</h2>
            <p>{subtitle}</p>
        </div>
        
        <div className={styles.testimonialGrid}>
            {testimonials.map((testimonial, index) => (
            <TestimonialCard 
                key={index}
                content={testimonial.content}
                authorName={testimonial.authorName}
                authorRole={testimonial.authorRole}
                authorImage={testimonial.authorImage}
            />
            ))}
        </div>
        </section>
    );
};

export default Testimonials;