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
                    {[1, 2].map(i => (
                        <div key={i} className="session-item">
                            <div className="session-date-box">
                                <span className="month">FEB</span>
                                <span className="day">{10 + i}</span>
                            </div>

                            <div className="session-info">
                                <h4 className="session-title-h4">Career Guidance Session</h4>
                                <div className="session-meta-row">
                                    <div className="session-meta-item"><Clock size={16} /> 2:00 PM - 3:00 PM</div>
                                    <div className="session-meta-item"><Video size={16} /> Zoom Meeting</div>
                                </div>
                            </div>

                            <div className="flex-row-gap gap-sm">
                                <button className="btn btn-primary btn-sm">Join</button>
                                <button className="btn btn-secondary btn-sm">Reschedule</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeacherMentoring;
