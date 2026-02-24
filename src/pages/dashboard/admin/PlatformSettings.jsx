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
            <header className="admin-page-header">
                <div>
                    <h1>Platform Settings</h1>
                    <p>Configure global rules, financial logic, and system-wide limits</p>
                </div>
            </header>

            {message && (
                <div className={`admin-alert ${message.type}`}>
                    {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span>{message.text}</span>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
                {groups.map(group => (
                    <div key={group.id} className="admin-card no-hover" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--admin-primary)', borderBottom: '1px solid var(--admin-card-border)', paddingBottom: '1rem' }}>
                            <div style={{ color: 'var(--primary-500)' }}>{group.icon}</div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>{group.label}</h2>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Commission Fee Group */}
                            {group.id === 'finance' && (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem' }}>
                                        <div style={{ flex: 1 }}>
                                            <label style={{ fontWeight: 700, color: 'var(--gray-700)', display: 'block', marginBottom: '4px' }}>Platform Commission (%)</label>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', margin: 0 }}>Deducted from freelancer earnings automatically.</p>
                                        </div>
                                        <input
                                            type="number"
                                            className="admin-select"
                                            style={{ width: '100px', minWidth: 'unset', padding: '0.5rem' }}
                                            defaultValue={settings.find(s => s.key === 'commission_fee')?.value || 10}
                                            onBlur={(e) => handleUpdate('commission_fee', Number(e.target.value))}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem' }}>
                                        <div style={{ flex: 1 }}>
                                            <label style={{ fontWeight: 700, color: 'var(--gray-700)', display: 'block', marginBottom: '4px' }}>Min Withdrawal ($)</label>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', margin: 0 }}>Balance required to request a payout.</p>
                                        </div>
                                        <input
                                            type="number"
                                            className="admin-select"
                                            style={{ width: '100px', minWidth: 'unset', padding: '0.5rem' }}
                                            defaultValue={settings.find(s => s.key === 'min_withdrawal')?.value || 50}
                                            onBlur={(e) => handleUpdate('min_withdrawal', Number(e.target.value))}
                                        />
                                    </div>
                                </>
                            )}

                            {/* Verification Group */}
                            {group.id === 'verification' && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontWeight: 700, color: 'var(--gray-700)', display: 'block', marginBottom: '4px' }}>Skill Threshold for Badge</label>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', margin: 0 }}>Score (%) for automatic "Verified" badge.</p>
                                    </div>
                                    <input
                                        type="number"
                                        className="admin-select"
                                        style={{ width: '100px', minWidth: 'unset', padding: '0.5rem' }}
                                        defaultValue={settings.find(s => s.key === 'min_skill_score')?.value || 80}
                                        onBlur={(e) => handleUpdate('min_skill_score', Number(e.target.value))}
                                    />
                                </div>
                            )}

                            {/* Communication Group */}
                            {group.id === 'notifications' && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontWeight: 700, color: 'var(--gray-700)', display: 'block', marginBottom: '4px' }}>Admin Alert Threshold ($)</label>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', margin: 0 }}>Notify if a transaction exceeds this value.</p>
                                    </div>
                                    <input
                                        type="number"
                                        className="admin-select"
                                        style={{ width: '100px', minWidth: 'unset', padding: '0.5rem' }}
                                        defaultValue={settings.find(s => s.key === 'notify_threshold')?.value || 1000}
                                        onBlur={(e) => handleUpdate('notify_threshold', Number(e.target.value))}
                                    />
                                </div>
                            )}

                            {/* General Storage Group */}
                            {group.id === 'general' && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontWeight: 700, color: 'var(--gray-700)', display: 'block', marginBottom: '4px' }}>Max Storage Size (MB)</label>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', margin: 0 }}>Limit for portfolios and task submissions.</p>
                                    </div>
                                    <input
                                        type="number"
                                        className="admin-select"
                                        style={{ width: '100px', minWidth: 'unset', padding: '0.5rem' }}
                                        defaultValue={settings.find(s => s.key === 'max_upload_mb')?.value || 10}
                                        onBlur={(e) => handleUpdate('max_upload_mb', Number(e.target.value))}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {saving && (
                <div style={{
                    position: 'fixed', bottom: '2rem', right: '2rem',
                    background: 'white', padding: '1rem 2rem', borderRadius: '12px',
                    boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: '1rem',
                    border: '1px solid var(--admin-card-border)', zIndex: 1000,
                    animation: 'adminFadeIn 0.3s ease-out'
                }}>
                    <Loader2 size={24} className="animate-spin text-primary-600" />
                    <span style={{ fontWeight: 700, color: 'var(--admin-primary)' }}>Syncing preferences...</span>
                </div>
            )}
        </div>
    );
};

export default PlatformSettings;
