import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, Menu, ChevronDown, CheckCircle, RefreshCw } from 'lucide-react';
import NotificationBell from '../notifications/NotificationBell';
import { useSearch } from '../../context/SearchContext';
import { useAuth } from '../../context/AuthContext';

const DashboardHeader = ({ user, toggleSidebar }) => {
    const { searchQuery, setSearchQuery } = useSearch();
    const { switchRole } = useAuth();
    const [isRoleDropdownOpen, setRoleDropdownOpen] = useState(false);
    const [switching, setSwitching] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setRoleDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSwitchRole = async (newRole) => {
        if (switching || newRole === user.role) {
            setRoleDropdownOpen(false);
            return;
        }
        setSwitching(true);
        try {
            await switchRole(newRole);
            window.location.href = `/dashboard/${newRole}/home`; // Hard reload for clean switch
        } catch (err) {
            console.error("Failed to switch role", err);
            // alert("Failed to switch role");
        } finally {
            setSwitching(false);
            setRoleDropdownOpen(false);
        }
    };

    const roles = ['student', 'freelancer', 'teacher', 'employer'];

    return (
        <header className="dashboard-header">
            <div className="header-left">
                <button className="mobile-menu-toggle" onClick={toggleSidebar}>
                    <Menu size={24} />
                </button>

                <div className="header-search">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="header-right">

                {/* Role Switcher Dropdown */}
                <div className="role-switcher-container" ref={dropdownRef}>
                    <button
                        className="role-switcher-btn"
                        onClick={() => setRoleDropdownOpen(!isRoleDropdownOpen)}
                    >
                        <RefreshCw size={18} className={`text-accent ${switching ? 'animate-spin' : ''}`} />
                        <span className="role-switcher-text">Switch View</span>
                        <ChevronDown size={14} className="text-muted" />
                    </button>

                    {isRoleDropdownOpen && (
                        <div className="role-dropdown-menu">
                            <div className="role-dropdown-header">
                                <span className="role-dropdown-title">Select Dashboard</span>
                            </div>
                            {roles.map((r) => (
                                <button
                                    key={r}
                                    onClick={() => handleSwitchRole(r)}
                                    disabled={switching}
                                    className={`role-dropdown-item ${user.role === r ? 'active' : ''}`}
                                >
                                    <span>{r}</span>
                                    {user.role === r && <CheckCircle size={16} className="text-accent" />}
                                    {user.role !== r && user.roles?.includes(r) && <CheckCircle size={14} className="text-muted" />}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="role-separator"></div>

                <NotificationBell />

                <div className="user-profile">
                    <div className="user-avatar">
                        {user?.name ? user.name.substring(0, 2).toUpperCase() : 'US'}
                    </div>
                    <div className="user-info">
                        <span className="user-name">{user?.name || 'User Name'}</span>
                        <span className="user-role">{user?.role || 'Role'}</span>
                    </div>
                    <ChevronDown size={16} className="text-muted" />
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
