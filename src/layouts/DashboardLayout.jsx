import React, { useState } from 'react';
import { Outlet, useParams, Navigate, useLocation } from 'react-router-dom';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';
import '../dashboard.css';

const DashboardLayout = ({ role: propRole }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { role: paramRole } = useParams();
    const { user, loading } = useAuth();
    const location = useLocation();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    if (loading) {
        return (
            <div className="flex-center min-h-screen">
                <Loader2 className="animate-spin text-accent" size={40} />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Determine the target role for this layout
    // If propRole is set (e.g. <DashboardLayout role="student" />), use that.
    // Otherwise use the URL param.
    const targetRole = propRole || paramRole;

    // Strict RBAC: If user.role doesn't match the target role of this route
    if (targetRole && user.role !== targetRole) {
        // Redirect them to their OWN dashboard
        return <Navigate to={`/dashboard/${user.role}`} replace />;
    }

    return (
        <div className="dashboard-layout">
            <DashboardSidebar
                isOpen={isSidebarOpen}
                role={user.role}
                toggleSidebar={toggleSidebar}
            />

            <div className="dashboard-main">
                <DashboardHeader
                    user={user}
                    toggleSidebar={toggleSidebar}
                />

                <main className="dashboard-content">
                    <Outlet />
                </main>
            </div>

            {/* Overlay for mobile sidebar closing */}
            {isSidebarOpen && (
                <div
                    className="overlay lg-hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default DashboardLayout;
