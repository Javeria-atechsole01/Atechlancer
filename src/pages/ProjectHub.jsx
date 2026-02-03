import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Eye, Filter } from 'lucide-react';
// import { projectService } from '../services/projectService'; // To be implemented

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
        }, 1000);
    }, []);

    const categories = ['All', 'Web Development', 'Mobile App', 'AI/ML', 'Design', 'Blockchain'];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-4xl font-bold text-navy-900 mb-4">Discover Amazing Student Projects</h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">Explore innovate projects built by AtechLancer students. Hire talent based on real-world proof of skills.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
                <div className="flex overflow-x-auto pb-2 gap-2 w-full md:w-auto no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-navy-900 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none shadow-sm"
                    />
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.filter(p => activeCategory === 'All' || p.category === activeCategory).map((project, index) => (
                        <Link
                            to={`/projects/${project.id}`}
                            key={project.id}
                            className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-in fade-in zoom-in-95"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {/* Thumbnail */}
                            <div className="relative h-48 overflow-hidden">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white font-bold border border-white px-4 py-2 rounded-full">View Project</span>
                                </div>
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                                    <Heart size={18} className="text-gray-600 hover:text-red-500 transition-colors" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">{project.category}</span>
                                    <div className="flex items-center gap-3 text-gray-400 text-xs">
                                        <span className="flex items-center gap-1"><Heart size={12} className="fill-current" /> {project.likes}</span>
                                        <span className="flex items-center gap-1"><Eye size={12} /> {project.views}</span>
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg text-navy-900 mb-1 group-hover:text-primary-600 transition-colors truncate">{project.title}</h3>
                                <p className="text-sm text-gray-500">by {project.student}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectHub;
