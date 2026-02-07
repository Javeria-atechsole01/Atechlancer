import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Eye, Filter } from 'lucide-react';
import './project-hub.css';

const ProjectHub = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    // Mock Data
    useEffect(() => {
        setTimeout(() => {
            setProjects([
                { id: 1, title: 'AI Finance Tracker', student: 'Sarah Smith', category: 'AI/ML', likes: 24, views: 120, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800' },
                { id: 2, title: 'E-Commerce Dashboard', student: 'Mike Jones', category: 'Web Development', likes: 18, views: 85, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
                { id: 3, title: 'Health & Wellness App', student: 'Emma Wilson', category: 'Mobile App', likes: 45, views: 300, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800' },
                { id: 4, title: 'Portfolio Website', student: 'Alex Brown', category: 'Design', likes: 12, views: 50, image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800' },
                { id: 5, title: 'Crypto Exchange', student: 'David Lee', category: 'Blockchain', likes: 30, views: 150, image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=800' },
            ]);
            setLoading(false);
        }, 800);
    }, []);

    const categories = ['All', 'Web Development', 'Mobile App', 'AI/ML', 'Design', 'Blockchain'];

    return (
        <div className="project-hub-page">
            <header className="hub-header">
                <h1>Discover Amazing Student Projects</h1>
                <p>Explore innovate projects built by AtechLancer students. Hire talent based on real-world proof of skills.</p>
            </header>

            {/* Filters */}
            <div className="hub-controls">
                <div className="filter-pills no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="search-wrap">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                    />
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="project-grid">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="skeleton" style={{ height: '300px', borderRadius: '16px' }}></div>
                    ))}
                </div>
            ) : (
                <div className="project-grid">
                    {projects.filter(p => activeCategory === 'All' || p.category === activeCategory).map((project) => (
                        <Link
                            to={`/projects/${project.id}`}
                            key={project.id}
                            className="project-hub-card"
                        >
                            <div className="card-thumb">
                                <img src={project.image} alt={project.title} loading="lazy" />
                                <div className="card-overlay">
                                    <span className="view-btn-text">View Project</span>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="card-meta-top">
                                    <span className="category-label">{project.category}</span>
                                    <div className="interaction-stats">
                                        <span className="stat-item"><Heart size={12} fill="currentColor" /> {project.likes}</span>
                                        <span className="stat-item"><Eye size={12} /> {project.views}</span>
                                    </div>
                                </div>
                                <h3 className="project-title-link">{project.title}</h3>
                                <p className="author-text">by {project.student}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectHub;
