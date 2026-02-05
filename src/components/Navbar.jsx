import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, Shield, Briefcase, GraduationCap, DollarSign, CheckCircle, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();
    const { user, logout } = useAuth();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu/dropdowns when route changes
    useEffect(() => {
        setIsOpen(false);
        setActiveDropdown(null);
    }, [location.pathname]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = (name) => {
        if (activeDropdown === name) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(name);
        }
    };

    const hireFreelancerCategories = [
        {
            title: 'Development & IT',
            items: ['Web Development', 'Mobile Apps', 'Software Engineering', 'DevOps & Cloud', 'Data Science', 'Blockchain']
        },
        {
            title: 'Design & Creative',
            items: ['Graphic Design', 'UI/UX Design', 'Video Editing', '3D Modeling', 'Brand Identity', 'Illustration']
        },
        {
            title: 'Writing & Marketing',
            items: ['Content Writing', 'SEO', 'Social Media Marketing', 'Copywriting', 'Public Relations', 'Email Marketing']
        },
        {
            title: 'Business & Support',
            items: ['Admin Support', 'Customer Service', 'Project Management', 'Market Research', 'Virtual Assistant', 'Legal Consulting']
        }
    ];

    const findWorkLinks = [
        { name: 'Browse Jobs', path: '/jobs', icon: <Briefcase size={18} /> },
        { name: 'Browse Gigs', path: '/marketplace', icon: <Globe size={18} /> },
        { name: 'Assignments', path: '/assignments', icon: <GraduationCap size={18} /> },
    ];

    const whyAtechlancerItems = [
        { name: 'Trust & Safety', path: '/trust', icon: <Shield size={18} /> },
        { name: 'Identity Verification', path: '/verification', icon: <CheckCircle size={18} /> },
        { name: 'Student Opportunities', path: '/students', icon: <GraduationCap size={18} /> },
        { name: 'Secure Payments', path: '/payments', icon: <DollarSign size={18} /> },
    ];

    const staticLinks = [
        { name: 'About', path: '/about' },
        { name: 'How It Works', path: '/how-it-works' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container" ref={dropdownRef}>
                <div className="navbar-content">
                    {/* LEFT SIDE: Brand + Naval Menus */}
                    <div className="navbar-left">
                        <Link to="/" className="navbar-brand">
                            <img src="/logo.png" alt="AL" className="navbar-logo-icon" />
                            <span className="navbar-logo-text">
                                <span className="text-navy">Atech</span><span className="text-green">lancer</span>
                            </span>
                        </Link>

                        <div className="navbar-desktop-menu">
                            {/* Dropdown: Hire Freelancers */}
                            <div className="nav-dropdown-wrapper">
                                <button
                                    className={`nav-menu-btn ${activeDropdown === 'hire' ? 'active' : ''}`}
                                    onClick={() => toggleDropdown('hire')}
                                >
                                    Hire freelancers <ChevronDown size={14} />
                                </button>
                                {activeDropdown === 'hire' && (
                                    <div className="mega-menu">
                                        <div className="mega-menu-grid">
                                            {hireFreelancerCategories.map((cat, idx) => (
                                                <div key={idx} className="mega-menu-col">
                                                    <h5>{cat.title}</h5>
                                                    <ul>
                                                        {cat.items.map((item, i) => (
                                                            <li key={i}>
                                                                <Link to={`/marketplace?category=${item}`}>{item}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Dropdown: Find Work */}
                            <div className="nav-dropdown-wrapper">
                                <button
                                    className={`nav-menu-btn ${activeDropdown === 'find' ? 'active' : ''}`}
                                    onClick={() => toggleDropdown('find')}
                                >
                                    Find work <ChevronDown size={14} />
                                </button>
                                {activeDropdown === 'find' && (
                                    <div className="standard-dropdown">
                                        {findWorkLinks.map((link, idx) => (
                                            <Link key={idx} to={link.path} className="dropdown-item">
                                                <span className="item-icon">{link.icon}</span>
                                                <span className="item-name">{link.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Dropdown: Why Atechlancer */}
                            <div className="nav-dropdown-wrapper">
                                <button
                                    className={`nav-menu-btn ${activeDropdown === 'why' ? 'active' : ''}`}
                                    onClick={() => toggleDropdown('why')}
                                >
                                    Why Atechlancer <ChevronDown size={14} />
                                </button>
                                {activeDropdown === 'why' && (
                                    <div className="standard-dropdown">
                                        {whyAtechlancerItems.map((link, idx) => (
                                            <Link key={idx} to={link.path} className="dropdown-item">
                                                <span className="item-icon">{link.icon}</span>
                                                <span className="item-name">{link.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Static Links */}
                            {staticLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE: Auth / Search / CTA */}
                    <div className="navbar-right">
                        <div className="navbar-auth-actions">
                            {user ? (
                                <>
                                    <Link to={`/dashboard/${user.role}`} className="navbar-link">Dashboard</Link>
                                    <button onClick={logout} className="navbar-link">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/auth/login" className="navbar-link">Login</Link>
                                    <Link to="/signup" className="navbar-cta">
                                        Get Verified
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="navbar-mobile-toggle"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="navbar-mobile-menu">
                    <div className="navbar-mobile-menu-content">
                        <div className="mobile-section">
                            <button className="mobile-nav-btn" onClick={() => toggleDropdown('m-hire')}>
                                Hire Freelancers <ChevronDown size={14} />
                            </button>
                            {activeDropdown === 'm-hire' && (
                                <div className="mobile-sub-menu">
                                    {hireFreelancerCategories.map(cat => cat.items.map((item, i) => (
                                        <Link key={i} to={`/marketplace?category=${item}`}>{item}</Link>
                                    )))}
                                </div>
                            )}
                        </div>

                        <Link to="/jobs" className="navbar-mobile-link">Find Work</Link>
                        <Link to="/how-it-works" className="navbar-mobile-link">How It Works</Link>
                        <Link to="/pricing" className="navbar-mobile-link">Pricing</Link>

                        <div className="navbar-mobile-cta-wrapper">
                            {user ? (
                                <Link to={`/dashboard/${user.role}`} className="navbar-mobile-cta">Dashboard</Link>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <Link to="/auth/login" className="navbar-mobile-link text-center">Login</Link>
                                    <Link to="/signup" className="navbar-mobile-cta">Get Verified</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
