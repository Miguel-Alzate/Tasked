import React from 'react';
import styles from './Footer.module.css';

interface FooterLinkGroup {
    title: string;
    links: {
        text: string;
        url: string;
    }[];
}

interface SocialLink {
    name: string;
    url: string;
    icon: React.ReactNode;
}

interface FooterProps {
    brandName: string;
    brandDescription: string;
    linkGroups: FooterLinkGroup[];
    socialLinks: SocialLink[];
    copyrightText: string;
}

const Footer: React.FC<FooterProps> = ({
    brandName,
    brandDescription,
    linkGroups,
    socialLinks,
    copyrightText
    }) => {
    return (
        <footer className={styles.footer}>
        <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
            <h3>{brandName}</h3>
            <p>{brandDescription}</p>
            <div className={styles.socialLinks}>
                {socialLinks.map((social, index) => (
                <a key={index} href={social.url} aria-label={social.name}>
                    {social.icon}
                </a>
                ))}
            </div>
            </div>
            
            {linkGroups.map((group, groupIndex) => (
            <div key={groupIndex} className={styles.footerLinks}>
                <h4>{group.title}</h4>
                <ul>
                {group.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                    <a href={link.url}>{link.text}</a>
                    </li>
                ))}
                </ul>
            </div>
            ))}
        </div>
        
        <div className={styles.copyright}>
            <p>{copyrightText}</p>
        </div>
        </footer>
    );
};

export default Footer;