import React, { useEffect, useState } from 'react';
import { MapPin, Briefcase, DollarSign, Loader2 } from 'lucide-react';
import { jobService } from '../../../services/jobService';
import { useNavigate } from 'react-router-dom';

const TeacherJobs = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await jobService.getAll({ preferredRole: 'teacher', limit: 12, sort: 'latest' });
                setJobs(data.results || []);
            } catch {
                setJobs([]);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Teaching Jobs</h1>
                    <p className="page-description">Find institutions looking for instructors.</p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="animate-spin text-primary-600" size={32} />
                </div>
            ) : jobs.length === 0 ? (
                <div className="card">
                    <p className="text-center text-gray-600">Currently no teaching jobs available.</p>
                </div>
            ) : (
                <div className="card-grid" style={{ gridTemplateColumns: '1fr' }}>
                    {jobs.map((job) => (
                        <div key={job._id} className="card" style={{ display: 'flex', flexDirection: 'row', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '8px', backgroundColor: 'var(--primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--brand-navy)' }}>
                                {(job.employerId?.name || 'Uni').slice(0, 3)}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--brand-navy)' }}>{job.title}</h3>
                                <p style={{ color: 'var(--gray-600)' }}>{job.employerId?.name || 'AtechLancer Partner'}</p>
                                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> {job.locationType || 'remote'}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Briefcase size={14} /> {job.type || 'contract'}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><DollarSign size={14} /> ${job.budget}</span>
                                </div>
                            </div>
                            <button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }} onClick={() => navigate(`/jobs/${job._id}/apply`)}>Apply Now</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TeacherJobs;
