import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { walletService } from '../../services/walletService';
import {
    Wallet, DollarSign, TrendingUp, Clock,
    ArrowUpRight, ArrowDownLeft, Download, Loader2
} from 'lucide-react';
import WithdrawModal from '../../components/wallet/WithdrawModal';
import TransactionHistory from '../../components/wallet/TransactionHistory';
import './wallet.css';

const WalletPage = () => {
    const navigate = useNavigate();
    const [wallet, setWallet] = useState(null);
    const [earnings, setEarnings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);

    useEffect(() => {
        loadWalletData();
    }, []);

    const loadWalletData = async () => {
        setLoading(true);
        try {
            const [walletData, earningsData] = await Promise.all([
                walletService.getWallet(),
                walletService.getEarningsSummary('month')
            ]);

            setWallet(walletData);
            setEarnings(earningsData);
        } catch (error) {
            console.error('Failed to load wallet data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleWithdrawSuccess = () => {
        setShowWithdrawModal(false);
        loadWalletData();
    };

    if (loading) {
        return (
            <div className="wallet-loading">
                <Loader2 className="animate-spin" size={48} />
                <p>Loading wallet...</p>
            </div>
        );
    }

    return (
        <div className="wallet-page">
            <div className="wallet-container">
                {/* Header */}
                <div className="wallet-header">
                    <div className="header-content">
                        <Wallet size={32} />
                        <div>
                            <h1>My Wallet</h1>
                            <p>Manage your earnings and transactions</p>
                        </div>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowWithdrawModal(true)}
                        disabled={!wallet?.availableBalance || wallet.availableBalance <= 0}
                    >
                        <ArrowUpRight size={18} />
                        Withdraw Earnings
                    </button>
                </div>

                {/* Balance Cards */}
                <div className="balance-cards">
                    <div className="balance-card primary">
                        <div className="card-icon">
                            <DollarSign size={24} />
                        </div>
                        <div className="card-content">
                            <span className="card-label">Available Balance</span>
                            <h2 className="card-amount">
                                ${wallet?.availableBalance?.toFixed(2) || '0.00'}
                            </h2>
                            <span className="card-subtitle">Ready to withdraw</span>
                        </div>
                    </div>

                    <div className="balance-card pending">
                        <div className="card-icon">
                            <Clock size={24} />
                        </div>
                        <div className="card-content">
                            <span className="card-label">Pending Earnings</span>
                            <h2 className="card-amount">
                                ${wallet?.pendingBalance?.toFixed(2) || '0.00'}
                            </h2>
                            <span className="card-subtitle">In progress orders</span>
                        </div>
                    </div>

                    <div className="balance-card escrow">
                        <div className="card-icon">
                            <TrendingUp size={24} />
                        </div>
                        <div className="card-content">
                            <span className="card-label">In Escrow</span>
                            <h2 className="card-amount">
                                ${wallet?.escrowBalance?.toFixed(2) || '0.00'}
                            </h2>
                            <span className="card-subtitle">Held for safety</span>
                        </div>
                    </div>

                    <div className="balance-card total">
                        <div className="card-icon">
                            <Wallet size={24} />
                        </div>
                        <div className="card-content">
                            <span className="card-label">Total Earnings</span>
                            <h2 className="card-amount">
                                ${wallet?.totalEarnings?.toFixed(2) || '0.00'}
                            </h2>
                            <span className="card-subtitle">All time</span>
                        </div>
                    </div>
                </div>

                {/* Earnings Summary */}
                {earnings && (
                    <div className="earnings-summary">
                        <h3>This Month</h3>
                        <div className="earnings-stats">
                            <div className="stat-item">
                                <ArrowDownLeft className="stat-icon income" size={20} />
                                <div>
                                    <span className="stat-label">Income</span>
                                    <span className="stat-value income">
                                        +${earnings.income?.toFixed(2) || '0.00'}
                                    </span>
                                </div>
                            </div>
                            <div className="stat-item">
                                <ArrowUpRight className="stat-icon expense" size={20} />
                                <div>
                                    <span className="stat-label">Withdrawals</span>
                                    <span className="stat-value expense">
                                        -${earnings.withdrawals?.toFixed(2) || '0.00'}
                                    </span>
                                </div>
                            </div>
                            <div className="stat-item">
                                <Download className="stat-icon" size={20} />
                                <div>
                                    <span className="stat-label">Net Earnings</span>
                                    <span className="stat-value">
                                        ${earnings.net?.toFixed(2) || '0.00'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Transaction History */}
                <TransactionHistory />
            </div>

            {/* Withdraw Modal */}
            {showWithdrawModal && (
                <WithdrawModal
                    availableBalance={wallet?.availableBalance || 0}
                    onClose={() => setShowWithdrawModal(false)}
                    onSuccess={handleWithdrawSuccess}
                />
            )}
        </div>
    );
};

export default WalletPage;
