import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    User,
    FileText,
    CheckCircle,
    CreditCard,
    Settings,
    Briefcase,
    BookOpen,
    Users,
    MessageSquare,
    LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardSidebar = ({ isOpen, role }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getNavItems = () => {
        // Shared items
        const commonItems = [
            { name: 'Dashboard', icon: <LayoutDashboard />, path: `/dashboard/${role}/home` },
            { name: 'Settings', icon: <Settings />, path: `/dashboard/${role}/settings` },
        ];

        switch (role) {
            case 'admin':
                return [
                    commonItems[0],
                    { name: 'Payments', icon: <CreditCard />, path: `/dashboard/admin/payments` },
                    commonItems[1],
                ];
            case 'student':
                return [
                    commonItems[0],
                    { name: 'Profile & Skills', icon: <User />, path: `/dashboard/student/profile` },
                    { name: 'Projects (FYP)', icon: <FileText />, path: `/dashboard/student/projects` },
                    { name: 'Assignments', icon: <BookOpen />, path: `/dashboard/student/assignments` },
                    { name: 'Submissions', icon: <CheckCircle />, path: `/dashboard/student/submissions` },
                    { name: 'Payments', icon: <CreditCard />, path: `/dashboard/student/payments` },
                    { name: 'Applications', icon: <Briefcase />, path: `/dashboard/student/applications` },
                    commonItems[1],
                ];
            case 'freelancer':
                return [
                    commonItems[0],
                    { name: 'Profile & Portfolio', icon: <User />, path: `/dashboard/freelancer/profile` },
                    { name: 'Gigs / Services', icon: <Briefcase />, path: `/dashboard/freelancer/gigs` },
                    { name: 'Assignments', icon: <BookOpen />, path: `/dashboard/freelancer/assignments` },
                    { name: 'Orders', icon: <FileText />, path: `/dashboard/freelancer/orders` },
                    { name: 'Earnings', icon: <CreditCard />, path: `/dashboard/freelancer/earnings` },
                    { name: 'Applications', icon: <Briefcase />, path: `/dashboard/freelancer/applications` },
                    commonItems[1],
                ];
            case 'teacher':
                return [
                    commonItems[0],
                    { name: 'Profile', icon: <User />, path: `/dashboard/teacher/profile` },
                    { name: 'Courses', icon: <BookOpen />, path: `/dashboard/teacher/courses` },
                    { name: 'Teaching Jobs', icon: <Briefcase />, path: `/dashboard/teacher/jobs` },
                    { name: 'Mentoring', icon: <Users />, path: `/dashboard/teacher/mentoring` },
                    { name: 'Earnings', icon: <CreditCard />, path: `/dashboard/teacher/earnings` },
                    commonItems[1],
                ];
            case 'employer':
                return [
                    commonItems[0],
                    { name: 'Post a Job', icon: <Briefcase />, path: `/dashboard/employer/post-job` },
                    { name: 'Candidates', icon: <Users />, path: `/dashboard/employer/candidates` },
                    { name: 'Applications', icon: <Briefcase />, path: `/dashboard/employer/applications` },
                    { name: 'Contracts', icon: <FileText />, path: `/dashboard/employer/contracts` },
                    { name: 'Payments', icon: <CreditCard />, path: `/dashboard/employer/payments` },
                    commonItems[1],
                ];
            default:
                return commonItems;
        }
    };

    const navItems = getNavItems();

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => { }} // Should toggle close in parent
                ></div>
            )}

            <aside className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="dashboard-sidebar-header">
                    <div className="dashboard-logo">
                        {/* Using a simple text/icon for now, similar to navbar brand */}
                        <span style={{ color: 'var(--brand-accent)' }}>Atech</span>Lancer
                    </div>
                </div>

                <nav className="dashboard-nav">
                    {navItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="dashboard-sidebar-footer">
                    <button
                        onClick={handleLogout}
                        className="nav-item"
                        style={{ cursor: 'pointer', width: '100%', background: 'none', border: 'none', textAlign: 'left', font: 'inherit' }}
                    >
                        <LogOut size={20} />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default DashboardSidebar;
