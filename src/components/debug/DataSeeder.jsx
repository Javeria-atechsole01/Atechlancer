import React, { useState } from 'react';
import { jobService } from '../../services/jobService';
import { gigsService } from '../../services/gigsService';
import { assignmentService } from '../../services/assignmentService';
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

const DataSeeder = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const sampleJobs = [
        {
            title: "Senior React Developer",
            description: "We are looking for an experienced React developer to help build our next-generation platform. Must have 5+ years of experience.",
            budget: 5000,
            type: "contract",
            experienceLevel: "Senior",
            locationType: "Remote",
            skills: ["React", "Node.js", "TypeScript"],
            category: "Development"
        },
        {
            title: "UX/UI Designer for Mobile App",
            description: "Need a creative designer to redesign our iOS and Android applications. Focus on clean, modern interfaces.",
            budget: 3000,
            type: "freelance",
            experienceLevel: "Mid-Level",
            locationType: "Remote",
            skills: ["Figma", "Mobile Design", "Prototyping"],
            category: "Design"
        },
        {
            title: "Content Writer for Tech Blog",
            description: "Looking for a tech-savvy writer to produce 4 articles per month on AI and Machine Learning topics.",
            budget: 500,
            type: "part-time",
            experienceLevel: "Entry",
            locationType: "Remote",
            skills: ["Writing", "SEO", "Technology"],
            category: "Writing"
        }
    ];

    const sampleGigs = [
        {
            title: "I will build a professional website in 24 hours",
            description: "Get a stunning, responsive website built with the latest technologies. Perfect for small businesses.",
            price: 150,
            deliveryTime: 1,
            category: "Development",
            features: ["Responsive Design", "SEO Optimization", "Source Code"],
            revisions: 3
        },
        {
            title: "I will design a unique logo for your brand",
            description: "Stand out with a custom logo design. I provide 3 concepts and unlimited revisions.",
            price: 50,
            deliveryTime: 3,
            category: "Design",
            features: ["High Resolution", "Vector Files", "3D Mockup"],
            revisions: 99
        },
        {
            title: "I will write SEO optimized blog posts",
            description: "Boost your traffic with engaging, keyword-rich content tailored to your niche.",
            price: 30,
            deliveryTime: 2,
            category: "Writing",
            features: ["Keyword Research", "Plagiarism Check", "Formatted Text"],
            revisions: 2
        }
    ];

    const sampleAssignments = [
        {
            title: "Calculus II Problem Set",
            description: "Need help solving 10 advanced calculus problems regarding integration and series.",
            academicLevel: "Undergraduate",
            subject: "Mathematics",
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            budget: { min: 50, max: 100 }
        },
        {
            title: "History Research Paper - WWII",
            description: "Requires a 2000-word research paper on the economic impact of World War II. Must use 5 academic sources.",
            academicLevel: "Masters",
            subject: "History",
            deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            budget: { min: 100, max: 200 }
        },
        {
            title: "Java Programming Project",
            description: "Implement a basic banking system using Java. Must include inheritance, polymorphism, and file I/O.",
            academicLevel: "Undergraduate",
            subject: "Computer Science",
            deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            budget: { min: 80, max: 150 }
        }
    ];

    const seedJobs = async () => {
        setLoading(true);
        setStatus('Seeding Jobs...');
        try {
            for (const job of sampleJobs) {
                await jobService.create(job);
            }
            setStatus('Jobs Seeded Successfully!');
        } catch (error) {
            console.error(error);
            setStatus('Error Seeding Jobs: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const seedGigs = async () => {
        setLoading(true);
        setStatus('Seeding Gigs...');
        try {
            for (const gig of sampleGigs) {
                await gigsService.create(gig);
            }
            setStatus('Gigs Seeded Successfully!');
        } catch (error) {
            console.error(error);
            setStatus('Error Seeding Gigs: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const seedAssignments = async () => {
        setLoading(true);
        setStatus('Seeding Assignments...');
        try {
            for (const assignment of sampleAssignments) {
                await assignmentService.create(assignment);
            }
            setStatus('Assignments Seeded Successfully!');
        } catch (error) {
            console.error(error);
            setStatus('Error Seeding Assignments: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Start Data Seeder</h2>

            {status && (
                <div style={{ padding: '1rem', background: '#f0f9ff', color: '#0369a1', marginBottom: '1.5rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={20} /> {status}
                </div>
            )}

            <div style={{ display: 'grid', gap: '1rem' }}>
                <button
                    onClick={seedJobs}
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                    {loading ? <Loader2 className="animate-spin" /> : 'Seed Sample Jobs'}
                </button>

                <button
                    onClick={seedGigs}
                    disabled={loading}
                    className="btn btn-secondary"
                    style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                    {loading ? <Loader2 className="animate-spin" /> : 'Seed Sample Gigs'}
                </button>

                <button
                    onClick={seedAssignments}
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#4f46e5' }}
                >
                    {loading ? <Loader2 className="animate-spin" /> : 'Seed Sample Assignments'}
                </button>
            </div>

            <div style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#6b7280', display: 'flex', gap: '8px' }}>
                <AlertTriangle size={16} />
                <p>Note: Ensure you are logged in with the appropriate role (Employer for Jobs, Freelancer for Gigs, Student for Assignments) before clicking these buttons, or the requests might fail due to permissions.</p>
            </div>
        </div>
    );
};

export default DataSeeder;
