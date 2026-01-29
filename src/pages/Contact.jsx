import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for your message. Our support team will respond shortly!");
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div>
            {/* Header */}
            <section className="contact-header">
                <div className="container">
                    <h1 className="page-title">Contact Support</h1>
                    <p className="page-description">
                        Need help or have a question? Our team is here to support students, freelancers, and employers 24/7.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Info */}
                        <div>
                            <h2 className="contact-info-title">Get in Touch</h2>
                            <div className="contact-info-list">
                                <div className="contact-info-item">
                                    <div className="contact-info-icon email">
                                        <Mail />
                                    </div>
                                    <div>
                                        <h4 className="contact-info-title-text">Email Us</h4>
                                        <p className="contact-info-value">support@atechlancer.com</p>
                                        <p className="contact-info-meta email">Response time: &lt; 2 hours</p>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon whatsapp">
                                        <MessageSquare />
                                    </div>
                                    <div>
                                        <h4 className="contact-info-title-text">WhatsApp Support</h4>
                                        <p className="contact-info-value">+92 325 3344552</p>
                                        <p className="contact-info-meta whatsapp">Available for verified users 24/7</p>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon hours">
                                        <Clock />
                                    </div>
                                    <div>
                                        <h4 className="contact-info-title-text">Operating Hours</h4>
                                        <p className="contact-info-value">Monday — Saturday</p>
                                        <p className="contact-info-meta hours">9:00 AM — 6:00 PM PKT (Main Office)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-notice">
                                <h4 className="contact-notice-title">Verification Inquiries</h4>
                                <p className="contact-notice-text">To check your profile verification status, please log in and visit your dashboard. Verification usually takes 24-48 hours.</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form">
                            <h3 className="contact-form-title">Send a Message</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="John Doe"
                                            className="form-input"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="john@example.com"
                                            className="form-input"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Message</label>
                                    <textarea
                                        required
                                        rows="5"
                                        placeholder="How can we help you?"
                                        className="form-textarea"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>
                                <button type="submit" className="form-submit">
                                    <span>Send Message</span>
                                    <Send />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
