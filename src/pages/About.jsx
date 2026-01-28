import React from 'react';
import { Target, Eye, Shield, Users, Award, BookOpen } from 'lucide-react';

const About = () => {
    const values = [
        { title: 'Mission', icon: Target, text: 'Empower students, freelancers, and educators with real opportunities through verified skills and trusted workflows.', type: 'mission' },
        { title: 'Vision', icon: Eye, text: 'To become the most trusted education-powered freelancing platform globally, merging learning with earning.', type: 'vision' },
    ];

    const differentiators = [
        { title: 'Manual Verification', desc: 'Every profile is reviewed by our admin team to ensure quality and authenticity.', icon: Shield },
        { title: 'Student-First Ecosystem', desc: 'Tailored opportunities for students to build portfolios while earning.', icon: BookOpen },
        { title: 'Integrated Learning', desc: 'Direct link between educational courses and real-world freelance gigs.', icon: Award },
        { title: 'Quality Control', desc: 'Admin-controlled standards for all services and educational content.', icon: Users },
    ];

    const problems = [
        { label: 'Fake Profiles', problem: 'The market is flooded with deceptive identities.', solution: 'We use manual identity and skill verification.' },
        { label: 'Low-Quality Work', problem: 'Finding true talent is a needle-in-a-haystack task.', solution: 'Our admin team vets every gig before it goes live.' },
        { label: 'Student Exploitation', problem: 'Students often lack professional outlets for their skills.', solution: 'We provide a safe space for students to earn through verified projects.' },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="page-header">
                <div className="container">
                    <h1 className="page-title">Our Story & Vision</h1>
                    <p className="page-description">
                        AtechLancer was born from a simple idea: that education and professional work should not be separate worlds. We're building a bridge between learning and earning.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section">
                <div className="container">
                    <div className="values-grid">
                        {values.map((item, i) => (
                            <div key={i} className="value-card">
                                <div className={`value-icon ${item.type}`}>
                                    <item.icon />
                                </div>
                                <h2 className="value-title">{item.title}</h2>
                                <p className="value-text">"{item.text}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why We Exist */}
            <section className="section section-gray">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Why We Exist</h2>
                        <p className="section-description">
                            The traditional gig economy often leaves students behind and rewards unverified "experts". We're changing that.
                        </p>
                    </div>
                    <div className="problem-grid">
                        <div className="problem-list">
                            {problems.map((item, idx) => (
                                <div key={idx} className="problem-card">
                                    <h4 className="problem-label">{item.label}</h4>
                                    <p className="problem-text">{item.problem}</p>
                                    <p className="problem-solution">→ {item.solution}</p>
                                </div>
                            ))}
                        </div>
                        <div className="problem-image">
                            <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1000" alt="Collaboration" />
                        </div>
                    </div>
                </div>
            </section>

            {/* What Makes Us Different */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">What Makes Us Different</h2>
                    <div className="differentiator-grid">
                        {differentiators.map((item, idx) => (
                            <div key={idx} className="differentiator-item">
                                <div className="differentiator-icon-wrap">
                                    <item.icon />
                                </div>
                                <h4 className="differentiator-title">{item.title}</h4>
                                <p className="differentiator-desc">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
