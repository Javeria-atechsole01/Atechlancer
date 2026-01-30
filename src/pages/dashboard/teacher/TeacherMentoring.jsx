import React from 'react';
import { Calendar, Clock, Video } from 'lucide-react';

const TeacherMentoring = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Mentoring Sessions</h1>
                    <p className="page-description">Manage your upcoming student sessions.</p>
                </div>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    Set Availability
                </button>
            </div>

            <div className="card">
                <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Upcoming Sessions</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[1, 2].map(i => (
                        <div key={i} style={{ display: 'flex', padding: '1rem', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '60px',
                                height: '60px',
                                backgroundColor: 'var(--primary-50)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--brand-navy)',
                                fontWeight: 'bold'
                            }}>
                                <span style={{ fontSize: '0.875rem' }}>FEB</span>
                                <span style={{ fontSize: '1.5rem', lineHeight: '1' }}>{10 + i}</span>
                            </div>

                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--brand-navy)' }}>Career Guidance Session</h4>
                                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', color: 'var(--gray-500)', fontSize: '0.9375rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} /> 2:00 PM - 3:00 PM</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Video size={16} /> Zoom Meeting</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Join</button>
                                <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Reschedule</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeacherMentoring;
