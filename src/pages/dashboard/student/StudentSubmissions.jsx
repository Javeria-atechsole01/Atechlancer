import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import './student.css';

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

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Reviewed': return <CheckCircle size={20} className="submission-status-icon reviewed" />;
            case 'Pending Review': return <Clock size={20} className="submission-status-icon pending" />;
            case 'Changes Requested': return <AlertCircle size={20} className="submission-status-icon requested" />;
            default: return null;
        }
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">My Submissions</h1>
                    <p className="page-description">Track status and feedback for your submitted work.</p>
                </div>
            </div>

            <div className="card">
                <div className="submission-list">
                    {submissions.map((sub) => (
                        <div key={sub.id} className="submission-item">
                            {getStatusIcon(sub.status)}

                            <div className="submission-content">
                                <div className="submission-meta-row">
                                    <h3 className="item-title m-0">{sub.title}</h3>
                                    <span className="text-muted text-sm">{sub.submittedDate}</span>
                                </div>

                                <div className="submission-tags-row">
                                    <span className={`tag ${sub.status === 'Reviewed' ? 'tag-verification' : 'tag-gray'}`}>
                                        {sub.status}
                                    </span>
                                    {sub.grade && (
                                        <span className="font-bold text-navy">Grade: {sub.grade}</span>
                                    )}
                                </div>

                                {sub.feedback && (
                                    <div className="submission-feedback">
                                        <b>Feedback:</b> {sub.feedback}
                                    </div>
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
