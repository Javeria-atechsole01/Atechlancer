import React, { useState, useEffect } from 'react';
import { adminService } from '../../../services/adminService';
import {
    Settings, Save, Percent, ShieldCheck,
    Bell, HardDrive, Loader2, CheckCircle, AlertCircle
} from 'lucide-react';
import './../../admin/admin.css';

const PlatformSettings = () => {
    const [settings, setSettings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        setLoading(true);
        try {
            const data = await adminService.getSettings();
            setSettings(data);
        } catch (error) {
            console.error('Failed to load settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (key, value) => {
        setSaving(true);
        try {
            await adminService.updateSetting(key, value);
            setMessage({ type: 'success', text: `Setting "${key}" updated successfully` });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update setting' });
        } finally {
            setSaving(false);
        }
    };

    const groups = [
        { id: 'finance', label: 'Financial Rules', icon: <Percent /> },
        { id: 'verification', label: 'Verification Rules', icon: <ShieldCheck /> },
        { id: 'notifications', label: 'Communication', icon: <Bell /> },
        { id: 'general', label: 'General Storage', icon: <HardDrive /> }
    ];

    if (loading) {
        return (
            <div className="admin-loading-state">
                <Loader2 className="animate-spin text-primary-500" size={48} />
                <p>Syncing platform preferences...</p>
            </div>
        );
    }

    return (
        <div className="admin-page-container">
            <div className="admin-page-hero">
                <h1>Platform Governance</h1>
                <p>Strategic configuration for financial logic, verification protocols, and system boundaries</p>
            </div>

            {message && (
                <div className={`admin-alert ${message.type}`}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: message.type === 'success' ? '#d1fae5' : '#fee2e2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    </div>
                    <span>{message.text}</span>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem' }}>
                {groups.map(group => (
                    <div key={group.id} className="admin-card no-hover" style={{ display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '14px',
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--admin-accent)',
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                                border: '1px solid var(--admin-card-border)'
                            }}>
                                {group.icon}
                            </div>
                            <div>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--admin-primary)', margin: 0 }}>{group.label}</h2>
                                <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontWeight: 600, textTransform: 'uppercase' }}>Module Configuration</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {/* Commission Fee Group */}
                            {group.id === 'finance' && (
                                <>
                                    <div className="settings-row">
                                        <div style={{ flex: 1 }}>
                                            <label style={{ fontWeight: 800, color: 'var(--admin-primary)', display: 'block', fontSize: '0.95rem' }}>Platform GTV Commission</label>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', margin: '2px 0 0 0', fontWeight: 600 }}>Revenue share from every completed order.</p>
                                        </div>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                type="number"
                                                className="admin-input"
                                                style={{ width: '120px', paddingRight: '2.5rem', textAlign: 'right' }}
                                                defaultValue={settings.find(s => s.key === 'commission_fee')?.value || 10}
                                                onBlur={(e) => handleUpdate('commission_fee', Number(e.target.value))}
                                            />
                                            <Percent size={14} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                                        </div>
                                    </div>
                                    <div className="settings-row">
                                        <div style={{ flex: 1 }}>
                                            <label style={{ fontWeight: 800, color: 'var(--admin-primary)', display: 'block', fontSize: '0.95rem' }}>Minimum Payout</label>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', margin: '2px 0 0 0', fontWeight: 600 }}>Hard limit for wallet withdrawal requests.</p>
                                        </div>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                type="number"
                                                className="admin-input"
                                                style={{ width: '120px', paddingLeft: '2.5rem' }}
                                                defaultValue={settings.find(s => s.key === 'min_withdrawal')?.value || 50}
                                                onBlur={(e) => handleUpdate('min_withdrawal', Number(e.target.value))}
                                            />
                                            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)', fontWeight: 800, fontSize: '0.9rem' }}>$</span>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Verification Group */}
                            {group.id === 'verification' && (
                                <div className="settings-row">
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontWeight: 800, color: 'var(--admin-primary)', display: 'block', fontSize: '0.95rem' }}>Credential Merit Floor</label>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', margin: '2px 0 0 0', fontWeight: 600 }}>Score required for automatic talent verification.</p>
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="number"
                                            className="admin-input"
                                            style={{ width: '120px', paddingRight: '2.5rem', textAlign: 'right' }}
                                            defaultValue={settings.find(s => s.key === 'min_skill_score')?.value || 80}
                                            onBlur={(e) => handleUpdate('min_skill_score', Number(e.target.value))}
                                        />
                                        <Percent size={14} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                                    </div>
                                </div>
                            )}

                            {/* Communication Group */}
                            {group.id === 'notifications' && (
                                <div className="settings-row">
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontWeight: 800, color: 'var(--admin-primary)', display: 'block', fontSize: '0.95rem' }}>Audit Trigger Limit</label>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', margin: '2px 0 0 0', fontWeight: 600 }}>Transactions above this flag for manual review.</p>
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="number"
                                            className="admin-input"
                                            style={{ width: '120px', paddingLeft: '2.5rem' }}
                                            defaultValue={settings.find(s => s.key === 'notify_threshold')?.value || 1000}
                                            onBlur={(e) => handleUpdate('notify_threshold', Number(e.target.value))}
                                        />
                                        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)', fontWeight: 800, fontSize: '0.9rem' }}>$</span>
                                    </div>
                                </div>
                            )}

                            {/* General Storage Group */}
                            {group.id === 'general' && (
                                <div className="settings-row">
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontWeight: 800, color: 'var(--admin-primary)', display: 'block', fontSize: '0.95rem' }}>Ingestion Data Ceiling</label>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', margin: '2px 0 0 0', fontWeight: 600 }}>Max allowed size for portfolio assets.</p>
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="number"
                                            className="admin-input"
                                            style={{ width: '120px', paddingRight: '3.5rem', textAlign: 'right' }}
                                            defaultValue={settings.find(s => s.key === 'max_upload_mb')?.value || 10}
                                            onBlur={(e) => handleUpdate('max_upload_mb', Number(e.target.value))}
                                        />
                                        <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)', fontWeight: 800, fontSize: '0.75rem' }}>MB</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {saving && (
                <div style={{
                    position: 'fixed', bottom: '2.5rem', right: '2.5rem',
                    background: 'var(--admin-primary)', color: 'white', padding: '1.25rem 2rem', borderRadius: '16px',
                    boxShadow: '0 15px 30px -10px rgba(36, 62, 86, 0.4)', display: 'flex', alignItems: 'center', gap: '1rem',
                    zIndex: 1000, border: '1px solid rgba(255,255,255,0.1)',
                    animation: 'adminFadeIn 0.3s ease-out'
                }}>
                    <Loader2 size={24} className="animate-spin" />
                    <span style={{ fontWeight: 800, fontSize: '1rem' }}>Updating Strategic Cells...</span>
                </div>
            )}
        </div>
    );
};

export default PlatformSettings;
