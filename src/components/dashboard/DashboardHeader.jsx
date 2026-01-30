import React from 'react';
import { Bell, Search, Menu, ChevronDown } from 'lucide-react';

const DashboardHeader = ({ user, toggleSidebar }) => {
    return (
        <header className="dashboard-header">
            <div className="header-left">
                <button className="mobile-menu-toggle" onClick={toggleSidebar}>
                    <Menu size={24} />
                </button>

                <div className="header-search">
                    <Search className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input"
                    />
                </div>
            </div>

            <div className="header-right">
                <button className="notification-btn">
                    <Bell size={20} />
                    <span className="notification-badge"></span>
                </button>

                <div className="user-profile">
                    <div className="user-avatar">
                        {user?.name ? user.name.substring(0, 2).toUpperCase() : 'US'}
                    </div>
                    <div className="user-info">
                        <span className="user-name">{user?.name || 'User Name'}</span>
                        <span className="user-role">{user?.role || 'Role'}</span>
                    </div>
                    <ChevronDown size={16} className="text-gray-400" />
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
