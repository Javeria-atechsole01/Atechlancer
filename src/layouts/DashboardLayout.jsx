import React, { useState } from 'react';
import { Outlet, useParams, Navigate } from 'react-router-dom';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import '../dashboard.css';

const DashboardLayout = ({ role: propRole }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { role: paramRole } = useParams();

    // Use propRole if provided (explicit routing), otherwise fallback to paramRole (dynamic routing)
    const role = propRole || paramRole;

    // In a real app, this would come from an Auth Context
    // For now, we simulate a user object based on the URL role
    const user = {
        name: 'Shani Local',
        role: role ? role.charAt(0).toUpperCase() + role.slice(1) : 'User',
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    // Safe guard: if no role is present, maybe redirect or handle it. 
    // Ideally App.jsx handles the :role param.

    return (
        <div className="dashboard-layout">
            <DashboardSidebar
                isOpen={isSidebarOpen}
                role={role}
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
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 40, backgroundColor: 'rgba(0,0,0,0.5)' }}
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default DashboardLayout;
