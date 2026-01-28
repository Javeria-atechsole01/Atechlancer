import React, { useState } from 'react';
import { Plus, Minus, Search, MessageCircle } from 'lucide-react';

const FAQ = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        { q: "Is AtechLancer free to join?", a: "Yes, creating an account as a student, freelancer, or educator is completely free. We only charge a small platform commission when you successfully complete a transaction." },
        { q: "How are freelancers verified?", a: "Our admin team manually reviews every application. Verification involves identity proof, portfolio assessment, and mandatory skill tests specifically designed for each category." },
        { q: "How do payments work?", a: "We use a secure Escrow system. The buyer pays upfront, the funds are held safely by AtechLancer, and are only released to the seller once the work is approved." },
        { q: "Can students earn money?", a: "Absolutely! Students can sell their final year projects, offer assignment help (if verified), and showcase their unique skills to potential employers." },
        { q: "Is assignment plagiarism checked?", a: "Yes, every assignment solution submitted on the platform goes through a strict automated plagiarism and AI-detection check before being delivered." },
        { q: "What happens in case of disputes?", a: "If either party is unsatisfied, our 24/7 support team mediates the dispute based on the agreed project scope and delivered work. We ensure a fair resolution for everyone." },
        { q: "Can I be both a freelancer and a student?", a: "Yes! Many of our most successful users are students who hire for their complex projects while simultaneously freelancing their own specialized skills." }
    ];

    const filteredFaqs = faqs.filter(f =>
        f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.a.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: 'var(--gray-50)', paddingBottom: '6rem' }}>
            {/* Header */}
            <section className="faq-header">
                <div className="container">
                    <h1 className="faq-title">Common Questions</h1>
                    <p className="faq-intro">
                        Everything you need to know about AtechLancer. Can't find an answer?
                        <a href="/contact">Chat with us</a>.
                    </p>

                    <div className="faq-search-wrapper">
                        <div className="faq-search-icon">
                            <Search />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            className="faq-search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* FAQ Accordion */}
            <section className="faq-list" style={{ marginTop: '5rem' }}>
                <div className="faq-list-items">
                    {filteredFaqs.map((faq, i) => (
                        <div key={i} className="faq-item">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                                className="faq-question"
                            >
                                <span className="faq-question-text">{faq.q}</span>
                                <div className={`faq-toggle-icon ${openIndex === i ? 'open' : ''}`}>
                                    {openIndex === i ? <Minus /> : <Plus />}
                                </div>
                            </button>
                            {openIndex === i && (
                                <div className="faq-answer">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {filteredFaqs.length === 0 && (
                    <div className="faq-empty">
                        <MessageCircle />
                        <h4 className="faq-empty-text">No results found for "{searchTerm}"</h4>
                    </div>
                )}
            </section>

            {/* Support CTA */}
            <section className="faq-cta">
                <div className="faq-cta-box">
                    <h3 className="faq-cta-title">Still have questions?</h3>
                    <p className="faq-cta-desc">We're here to help you get started on your journey.</p>
                    <a href="/contact" className="faq-cta-button">
                        Contact Support Team
                    </a>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
