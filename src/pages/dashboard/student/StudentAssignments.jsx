import React from 'react';
import { FileText, Calendar, Clock, Download, Upload } from 'lucide-react';

const StudentAssignments = () => {
    const assignments = [
        {
            id: 1,
            title: "Data Structures & Algorithms Implementation",
            course: "CS301 - Data Structures",
            deadline: "2026-02-15",
            status: "In Progress",
            grade: null,
        },
        {
            id: 2,
            title: "React.js Dashboard UI",
            course: "Web Engineering",
            deadline: "2026-02-10",
            status: "Pending",
            grade: null,
        },
        {
            id: 3,
            title: "Database Normalization",
            course: "CS401 - Databases",
            deadline: "2026-01-28",
            status: "Submitted",
            grade: "A",
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Progress': return 'text-blue-600 bg-blue-50';
            case 'Pending': return 'text-amber-600 bg-amber-50';
            case 'Submitted': return 'text-green-600 bg-green-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Assignments</h1>
                    <p className="page-description">Track your course assignments and deadlines.</p>
                </div>
            </div>

            <div className="card">
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                                <th style={{ padding: '1rem', color: 'var(--gray-500)', fontWeight: '600', fontSize: '0.875rem' }}>Assignment</th>
                                <th style={{ padding: '1rem', color: 'var(--gray-500)', fontWeight: '600', fontSize: '0.875rem' }}>Course</th>
                                <th style={{ padding: '1rem', color: 'var(--gray-500)', fontWeight: '600', fontSize: '0.875rem' }}>Deadline</th>
                                <th style={{ padding: '1rem', color: 'var(--gray-500)', fontWeight: '600', fontSize: '0.875rem' }}>Status</th>
                                <th style={{ padding: '1rem', color: 'var(--gray-500)', fontWeight: '600', fontSize: '0.875rem' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((item) => (
                                <tr key={item.id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                                    <td style={{ padding: '1rem', fontWeight: '500', color: 'var(--brand-navy)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ padding: '0.5rem', borderRadius: '8px', backgroundColor: 'var(--primary-50)', color: 'var(--brand-navy)' }}>
                                                <FileText size={18} />
                                            </div>
                                            {item.title}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', color: 'var(--gray-600)' }}>{item.course}</td>
                                    <td style={{ padding: '1rem', color: 'var(--gray-600)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Calendar size={14} />
                                            {item.deadline}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span
                                            style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                backgroundColor: item.status === 'Submitted' ? 'var(--accent-bg)' : 'var(--gray-100)',
                                                color: item.status === 'Submitted' ? 'var(--accent-text)' : 'var(--gray-700)',
                                                border: item.status === 'Submitted' ? '1px solid var(--accent-500)' : 'none'
                                            }}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem', borderRadius: '6px' }}>
                                            {item.status === 'Submitted' ? 'View' : 'Details'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentAssignments;
