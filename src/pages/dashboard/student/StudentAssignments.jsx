import React from 'react';
import { FileText, Calendar } from 'lucide-react';
import './student.css';

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

    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Assignments</h1>
                    <p className="page-description">Track your course assignments and deadlines.</p>
                </div>
            </div>

            <div className="card dashboard-table-wrapper">
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Assignment</th>
                            <th>Course</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.map((item) => (
                            <tr key={item.id}>
                                <td className="item-title">
                                    <div className="flex-row-gap gap-md">
                                        <div className="icon-box-sm">
                                            <FileText size={18} />
                                        </div>
                                        {item.title}
                                    </div>
                                </td>
                                <td className="item-meta">{item.course}</td>
                                <td className="item-meta">
                                    <div className="flex-row-gap gap-xs">
                                        <Calendar size={14} />
                                        {item.deadline}
                                    </div>
                                </td>
                                <td>
                                    <span className={`tag ${item.status === 'Submitted' ? 'tag-success' : 'tag-gray'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn btn-secondary btn-sm">
                                        {item.status === 'Submitted' ? 'View' : 'Details'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentAssignments;
