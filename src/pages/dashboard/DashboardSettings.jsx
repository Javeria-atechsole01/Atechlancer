import React, { useState } from 'react';
import { User, Lock, Bell, Shield, Save } from 'lucide-react';

const DashboardSettings = () => {
    const [activeTab, setActiveTab] = useState('account');

    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Account Settings</h1>
                    <p className="page-description">Manage your account preferences and security.</p>
                </div>
            </div>

            <div className="layout-grid" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>

                {/* Settings Sidebar */}
                <div className="card" style={{ padding: '0.5rem', height: 'fit-content' }}>
                    <div
                        className={`nav-item ${activeTab === 'account' ? 'active' : ''}`}
                        onClick={() => setActiveTab('account')}
                        style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem', backgroundColor: activeTab === 'account' ? 'var(--primary-50)' : 'transparent', color: activeTab === 'account' ? 'var(--brand-navy)' : 'var(--gray-600)' }}
                    >
                        <User size={18} /> Account
                    </div>
                    <div
                        className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                        style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem', backgroundColor: activeTab === 'security' ? 'var(--primary-50)' : 'transparent', color: activeTab === 'security' ? 'var(--brand-navy)' : 'var(--gray-600)' }}
                    >
                        <Lock size={18} /> Security
                    </div>
                    <div
                        className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notifications')}
                        style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem', backgroundColor: activeTab === 'notifications' ? 'var(--primary-50)' : 'transparent', color: activeTab === 'notifications' ? 'var(--brand-navy)' : 'var(--gray-600)' }}
                    >
                        <Bell size={18} /> Notifications
                    </div>
                </div>

                {/* Settings Content */}
                <div className="card">
                    {activeTab === 'account' && (
                        <div>
                            <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Personal Information</h3>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <div>
                                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>First Name</label>
                                        <input type="text" className="search-input" defaultValue="Shani" />
                                    </div>
                                    <div>
                                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Last Name</label>
                                        <input type="text" className="search-input" defaultValue="Local" />
                                    </div>
                                </div>
                                <div>
                                    <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Email Address</label>
                                    <input type="email" className="search-input" defaultValue="shani@example.com" disabled style={{ backgroundColor: 'var(--gray-100)', cursor: 'not-allowed' }} />
                                </div>
                                <div>
                                    <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Phone Number</label>
                                    <input type="text" className="search-input" defaultValue="+92 300 1234567" />
                                </div>
                                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Save size={16} /> Save Changes</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div>
                            <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Password & Security</h3>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Current Password</label>
                                    <input type="password" className="search-input" placeholder="Enter current password" />
                                </div>
                                <div>
                                    <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>New Password</label>
                                    <input type="password" className="search-input" placeholder="Enter new password" />
                                </div>
                                <div>
                                    <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Confirm New Password</label>
                                    <input type="password" className="search-input" placeholder="Confirm new password" />
                                </div>
                                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={16} /> Update Password</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div>
                            <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Notification Preferences</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)' }}>
                                    <div>
                                        <h4 style={{ fontSize: '0.9375rem', fontWeight: '600', color: 'var(--brand-navy)' }}>Email Notifications</h4>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Receive updates about your account via email.</p>
                                    </div>
                                    <input type="checkbox" defaultChecked style={{ width: '1.25rem', height: '1.25rem' }} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)' }}>
                                    <div>
                                        <h4 style={{ fontSize: '0.9375rem', fontWeight: '600', color: 'var(--brand-navy)' }}>Order Updates</h4>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Get notified when status changes on your orders.</p>
                                    </div>
                                    <input type="checkbox" defaultChecked style={{ width: '1.25rem', height: '1.25rem' }} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardSettings;
