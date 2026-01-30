import React from 'react';
import { Search, Filter, MapPin, Briefcase } from 'lucide-react';

const EmployerCandidates = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Find Candidates</h1>
                    <p className="page-description">Browse top talent for your projects.</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="card" style={{ marginBottom: '2rem', padding: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Search style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--gray-400)' }} size={20} />
                        <input type="text" className="search-input" placeholder="Search by skill, name, or role..." style={{ paddingLeft: '2.5rem', width: '100%' }} />
                    </div>
                    <button className="btn btn-secondary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <Filter size={18} /> Filters
                    </button>
                    <button className="btn btn-primary">Search</button>
                </div>
            </div>

            {/* Candidate Grid */}
            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div className="card" key={i} style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--primary-50)',
                            margin: '0 auto 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            color: 'var(--brand-navy)'
                        }}>
                            C{i}
                        </div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'var(--brand-navy)' }}>Candidate {i}</h3>
                        <p style={{ color: 'var(--gray-600)', marginBottom: '0.5rem' }}>Full Stack Developer</p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <span className="tag" style={{ margin: 0, fontSize: '0.75rem' }}>React</span>
                            <span className="tag" style={{ margin: 0, fontSize: '0.75rem' }}>Node</span>
                        </div>

                        <div style={{ borderTop: '1px solid var(--gray-100)', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> Remote</span>
                            <span style={{ fontWeight: '600', color: 'var(--brand-navy)' }}>$40/hr</span>
                        </div>

                        <button className="btn btn-secondary" style={{ width: '100%', marginTop: '1rem' }}>View Profile</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployerCandidates;
