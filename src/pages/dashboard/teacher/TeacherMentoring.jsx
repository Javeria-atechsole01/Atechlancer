import React from 'react';
import { Calendar, Clock, Video } from 'lucide-react';
import './teacher.css';

const TeacherMentoring = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Mentoring Sessions</h1>
                    <p className="page-description">Manage your upcoming student sessions.</p>
                </div>
                <button className="btn btn-primary">
                    Set Availability
                </button>
            </div>

            <div className="card">
                <h3 className="card-title">Upcoming Sessions</h3>

                <div className="session-list">
                    {[
                        { id: 1, date: 'FEB 26', student: 'Alex Johnson', topic: 'Advanced React Architecture', time: '2:00 PM - 3:00 PM', status: 'Upcoming' },
                        { id: 2, date: 'FEB 27', student: 'Sarah Smith', topic: 'UI/UX Principles', time: '11:00 AM - 12:00 PM', status: 'Upcoming' }
                    ].map(session => (
                        <div key={session.id} className="session-item card-hover" style={{ border: '1px solid var(--gray-100)', marginBottom: '1rem' }}>
                            <div className="session-date-box" style={{ background: 'var(--admin-bg)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}>
                                <span className="month" style={{ color: 'var(--admin-primary)', fontWeight: 700 }}>{session.date.split(' ')[0]}</span>
                                <span className="day" style={{ fontSize: '1.25rem', fontWeight: 800 }}>{session.date.split(' ')[1]}</span>
                            </div>

                            <div className="session-info" style={{ flex: 1 }}>
                                <div className="flex-row-gap gap-sm mb-xs">
                                    <h4 className="session-title-h4" style={{ margin: 0 }}>{session.topic}</h4>
                                    <span className="tag tag-accent-light" style={{ fontSize: '0.7rem' }}>{session.status}</span>
                                </div>
                                <p style={{ margin: '4px 0', fontSize: '0.9rem', color: 'var(--gray-600)' }}>
                                    Student: <span style={{ fontWeight: 600, color: 'var(--gray-800)' }}>{session.student}</span>
                                </p>
                                <div className="session-meta-row" style={{ marginTop: '0.5rem' }}>
                                    <div className="session-meta-item"><Clock size={16} /> {session.time}</div>
                                    <div className="session-meta-item"><Video size={16} /> Zoom Meeting</div>
                                </div>
                            </div>

                            <div className="flex-row-gap gap-sm">
                                <button className="btn btn-primary btn-sm" style={{ padding: '8px 16px' }}>Join Call</button>
                                <button className="btn btn-ghost btn-sm">Reschedule</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeacherMentoring;
