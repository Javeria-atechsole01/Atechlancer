import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        platform: [
            { name: 'Freelance Services', path: '/services' },
            { name: 'Student Projects', path: '/projects' },
            { name: 'Online Courses', path: '/courses' },
            { name: 'Assignment Solutions', path: '/assignments' },
        ],
        company: [
            { name: 'About Us', path: '/about' },
            { name: 'How It Works', path: '/how-it-works' },
            { name: 'Pricing', path: '/pricing' },
            { name: 'Contact', path: '/contact' },
        ],
        support: [
            { name: 'Help Center', path: '/support' },
            { name: 'Privacy Policy', path: '/privacy' },
            { name: 'Terms of Service', path: '/terms' },
            { name: 'FAQs', path: '/faq' },
        ],
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-grid">
                        {/* Brand Section */}
                        <div className="footer-brand">
                            <Link to="/" className="footer-brand-link">
                                <div className="footer-logo">
                                    <Shield />
                                </div>
                                <span className="footer-title">
                                    Atech<span>Lancer</span>
                                </span>
                            </Link>
                            <p className="footer-description">
                                Where Skills, Education & Freelancing Meet. The most trusted platform for verified opportunities.
                            </p>
                            <div className="footer-social">
                                <a href="#" className="footer-social-link">
                                    <Facebook />
                                </a>
                                <a href="#" className="footer-social-link">
                                    <Twitter />
                                </a>
                                <a href="#" className="footer-social-link">
                                    <Linkedin />
                                </a>
                                <a href="#" className="footer-social-link">
                                    <Instagram />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-section">
                            <h3>Platform</h3>
                            <ul className="footer-links">
                                {footerLinks.platform.map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.path} className="footer-link">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="footer-section">
                            <h3>Company</h3>
                            <ul className="footer-links">
                                {footerLinks.company.map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.path} className="footer-link">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="footer-contact">
                            <h3>Get in Touch</h3>
                            <div className="footer-contact-item">
                                <div className="footer-contact-icon">
                                    <MapPin />
                                </div>
                                <span>Modern Education District, Silicon Valley, CA</span>
                            </div>
                            <div className="footer-contact-item">
                                <div className="footer-contact-icon">
                                    <Phone />
                                </div>
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="footer-contact-item">
                                <div className="footer-contact-icon">
                                    <Mail />
                                </div>
                                <span>support@atechlancer.com</span>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; {currentYear} AtechLancer. All rights reserved.</p>
                        <div className="footer-bottom-links">
                            <Link to="/privacy" className="footer-bottom-link">Privacy Policy</Link>
                            <Link to="/terms" className="footer-bottom-link">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
