import React, { useState } from 'react';
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
    LogOut,
    Building2,
    GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardSidebar = ({ isOpen, role }) => {
    const { logout, switchRole, user } = useAuth();
    const navigate = useNavigate();
    const [switching, setSwitching] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSwitchRole = async (newRole) => {
        if (switching) return;
        setSwitching(true);
        try {
            const data = await switchRole(newRole);
            // It might take a ms for state to update, but navigation should happen
            // Force strict navigation
            window.location.href = `/dashboard/${newRole}/home`; // Hard reload to ensure clean slate often better for major context switch
        } catch (err) {
            console.error("Failed to switch role", err);
            // alert("Failed to switch role. Please try again.");
        } finally {
            setSwitching(false);
        }
    };

    const getNavItems = () => {
        // Shared items
        const commonItems = [
            { name: 'Dashboard', icon: <LayoutDashboard />, path: `/dashboard/${role}/home` },
            { name: 'Settings', icon: <Settings />, path: `/dashboard/${role}/settings` },
        ];

        switch (role) {
            case 'student':
                return [
                    commonItems[0],
                    { name: 'Profile & Skills', icon: <User />, path: `/dashboard/student/profile` },
                    { name: 'Projects (FYP)', icon: <FileText />, path: `/dashboard/student/projects` },
                    { name: 'Assignments', icon: <BookOpen />, path: `/dashboard/student/assignments` },
                    { name: 'Submissions', icon: <CheckCircle />, path: `/dashboard/student/submissions` },
                    { name: 'Payments', icon: <CreditCard />, path: `/dashboard/student/payments` },
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
                    { name: 'Contracts', icon: <FileText />, path: `/dashboard/employer/contracts` },
                    { name: 'Payments', icon: <CreditCard />, path: `/dashboard/employer/payments` },
                    commonItems[1],
                ];
            default:
                return commonItems;
        }
    };

    const navItems = getNavItems();

    // Define available roles to switch to
    const availableRoles = ['student', 'freelancer', 'teacher', 'employer'].filter(r => r !== role);

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

                    {/* Role Switcher Section */}
                    <div className="mb-4 pt-4 border-t border-white/10">
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Switch View</p>
                        <div className="space-y-1">
                            {availableRoles.map(r => (
                                <button
                                    key={r}
                                    onClick={() => handleSwitchRole(r)}
                                    disabled={switching}
                                    className="nav-item w-full text-left hover:bg-white/5 transition-colors"
                                    style={{ background: 'transparent', border: 'none', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', cursor: 'pointer', color: '#94a3b8' }}
                                >
                                    <SwitchRoleIcon role={r} />
                                    <span className="capitalize">{r}</span>
                                    {user?.roles?.includes(r) && <CheckCircle size={14} className="ml-auto text-green-500" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="nav-item"
                        style={{ cursor: 'pointer', width: '100%', background: 'none', border: 'none', textAlign: 'left', font: 'inherit', marginTop: '0' }}
                    >
                        <LogOut size={20} />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

const SwitchRoleIcon = ({ role }) => {
    switch (role) {
        case 'student': return <GraduationCap size={16} />;
        case 'freelancer': return <Briefcase size={16} />;
        case 'teacher': return <User size={16} />;
        case 'employer': return <Building2 size={16} />;
        default: return <User size={16} />;
    }
};

export default DashboardSidebar;
