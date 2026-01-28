import React from 'react';
import { UserPlus, Upload, ShieldCheck, DollarSign, Briefcase, GraduationCap, Building2, UserCheck } from 'lucide-react';

const HowItWorks = () => {
    const steps = {
        students: [
            { title: 'Sign Up', desc: 'Create your student profile and verify your university ID.', icon: UserPlus },
            { title: 'Upload Project', desc: 'List your final year projects or assignment requests.', icon: Upload },
            { title: 'Hire Talent', desc: 'Browse verified freelancers to collaborate with.', icon: UserCheck },
            { title: 'Receive Solution', desc: 'Get high-quality, plagiarism-free work securely.', icon: ShieldCheck },
            { title: 'Rate & Review', desc: 'Confirm satisfaction and help build the community trust.', icon: GraduationCap },
        ],
        freelancers: [
            { title: 'Sign Up', desc: 'Complete your professional profile and portfolio.', icon: UserPlus },
            { title: 'Admin Approval', desc: 'Pass skill tests and manual document verification.', icon: ShieldCheck },
            { title: 'Create Gigs', desc: 'Offer your services to students and employers.', icon: Briefcase },
            { title: 'Get Paid', desc: 'Receive payments via our secure escrow system.', icon: DollarSign },
        ],
        teachers: [
            { title: 'Apply', desc: 'Submit your credentials for expert verification.', icon: UserCheck },
            { title: 'Upload Courses', desc: 'Create and publish premium recorded content.', icon: Upload },
            { title: 'Earn Revenue', desc: 'Generate income from students viewing your courses.', icon: DollarSign },
        ],
        employers: [
            { title: 'Post Job', desc: 'Describe your requirements and project scope.', icon: Briefcase },
            { title: 'Hire Verified', desc: 'Connect with talent pre-vetted by our admin team.', icon: Building2 },
            { title: 'Confident Delivery', desc: 'Enjoy guaranteed quality and escrow protection.', icon: ShieldCheck },
        ]
    };

    const RoleSection = ({ title, data, roleType }) => (
        <div className="role-section">
            <div className="role-header">
                <h3 className={`role-title ${roleType}`}>{title}</h3>
                <div className="role-divider"></div>
            </div>
            <div className="steps-grid">
                {data.map((step, idx) => (
                    <div key={idx} className="step-card">
                        <div className="step-number">STEP {idx + 1}</div>
                        <div className={`step-icon ${roleType}`}>
                            <step.icon />
                        </div>
                        <h4 className="step-title">{step.title}</h4>
                        <p className="step-desc">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div>
            {/* Header */}
            <section className="section-primary" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 className="page-title">How AtechLancer Works</h1>
                    <p className="page-description" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        A seamless, verified, and secure process designed for every user in our ecosystem.
                    </p>
                </div>
            </section>

            {/* Steps Sections */}
            <section className="section">
                <div className="container">
                    <RoleSection title="For Students" data={steps.students} roleType="students" />
                    <RoleSection title="For Freelancers" data={steps.freelancers} roleType="freelancers" />
                    <RoleSection title="For Teachers" data={steps.teachers} roleType="teachers" />
                    <RoleSection title="For Employers" data={steps.employers} roleType="employers" />
                </div>
            </section>

            {/* Final CTA */}
            <section style={{ paddingBottom: '6rem' }}>
                <div className="container">
                    <div className="cta-box">
                        <h2 className="cta-title" style={{ fontStyle: 'italic' }}>Ready to Experience Smooth Professional workflows?</h2>
                        <button className="cta-button">
                            Get Started Today
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;
