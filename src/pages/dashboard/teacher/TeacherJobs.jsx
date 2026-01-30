import React from 'react';
import { MapPin, Briefcase, DollarSign } from 'lucide-react';

const TeacherJobs = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Teaching Jobs</h1>
                    <p className="page-description">Find institutions looking for instructors.</p>
                </div>
            </div>

            <div className="card-grid" style={{ gridTemplateColumns: '1fr' }}>
                {[1, 2, 3].map(i => (
                    <div key={i} className="card" style={{ display: 'flex', flexDirection: 'row', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '8px', backgroundColor: 'var(--primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--brand-navy)' }}>
                            Uni
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--brand-navy)' }}>Visiting Lecturer - Computer Science</h3>
                            <p style={{ color: 'var(--gray-600)' }}>University of Technology, Lahore</p>
                            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> On-site</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Briefcase size={14} /> Contract</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><DollarSign size={14} /> 50k - 80k / month</span>
                            </div>
                        </div>
                        <button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>Apply Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherJobs;
