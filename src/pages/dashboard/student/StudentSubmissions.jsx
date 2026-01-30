import React from 'react';
import { CheckCircle, Clock, FileText, AlertCircle } from 'lucide-react';

const StudentSubmissions = () => {
    const submissions = [
        {
            id: 1,
            title: "Data Structures - Linked List Assignment",
            submittedDate: "Jan 28, 2026",
            status: "Reviewed",
            grade: "A",
            feedback: "Excellent work on edge cases."
        },
        {
            id: 2,
            title: "Web Engineering - React Basics",
            submittedDate: "Jan 30, 2026",
            status: "Pending Review",
            grade: null,
            feedback: null
        },
        {
            id: 3,
            title: "Database - ER Diagram",
            submittedDate: "Jan 25, 2026",
            status: "Changes Requested",
            grade: null,
            feedback: "Please fix the relationship cardinality between User and Order entities."
        }
    ];

    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">My Submissions</h1>
                    <p className="page-description">Track status and feedback for your submitted work.</p>
                </div>
            </div>

            <div className="card">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {submissions.map((sub, index) => (
                        <div key={sub.id} style={{
                            display: 'flex',
                            gap: '1rem',
                            padding: '1.5rem',
                            borderBottom: index !== submissions.length - 1 ? '1px solid var(--gray-100)' : 'none',
                            alignItems: 'flex-start'
                        }}>
                            <div style={{
                                marginTop: '0.25rem',
                                color: sub.status === 'Reviewed' ? 'var(--accent-500)' :
                                    sub.status === 'Pending Review' ? '#eab308' : '#ef4444'
                            }}>
                                {sub.status === 'Reviewed' ? <CheckCircle size={20} /> :
                                    sub.status === 'Pending Review' ? <Clock size={20} /> : <AlertCircle size={20} />}
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                    <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--brand-navy)' }}>{sub.title}</h3>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>{sub.submittedDate}</span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <span className={`tag ${sub.status === 'Reviewed' ? 'tag-verification' : ''}`} style={{ margin: 0 }}>
                                        {sub.status}
                                    </span>
                                    {sub.grade && <span style={{ fontWeight: 'bold', color: 'var(--brand-navy)' }}>Grade: {sub.grade}</span>}
                                </div>

                                {sub.feedback && (
                                    <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', backgroundColor: 'var(--gray-50)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginTop: '0.5rem' }}>
                                        <span style={{ fontWeight: '600' }}>Feedback:</span> {sub.feedback}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentSubmissions;
