import React, { useState, useEffect } from 'react';
import { walletService } from '../../services/walletService';
import {
    Filter, Download, ArrowUpRight, ArrowDownLeft,
    RefreshCw, Loader2, AlertCircle
} from 'lucide-react';
import './wallet.css';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        type: 'all',
        status: 'all',
        page: 1,
        limit: 20
    });
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        loadTransactions();
    }, [filters]);

    const loadTransactions = async () => {
        setLoading(true);
        try {
            const filterParams = {};
            if (filters.type !== 'all') filterParams.type = filters.type;
            if (filters.status !== 'all') filterParams.status = filters.status;
            filterParams.page = filters.page;
            filterParams.limit = filters.limit;

            const data = await walletService.getTransactions(filterParams);
            setTransactions(data.transactions || []);
            setHasMore(data.hasMore || false);
        } catch (error) {
            console.error('Failed to load transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const getTransactionIcon = (type) => {
        switch (type) {
            case 'credit':
            case 'earning':
            case 'refund':
                return <ArrowDownLeft className="transaction-icon income" size={20} />;
            case 'debit':
            case 'withdrawal':
            case 'payment':
                return <ArrowUpRight className="transaction-icon expense" size={20} />;
            default:
                return <RefreshCw className="transaction-icon" size={20} />;
        }
    };

    const getStatusBadge = (status) => {
        const statusClasses = {
            completed: 'status-badge success',
            pending: 'status-badge warning',
            failed: 'status-badge error',
            cancelled: 'status-badge neutral'
        };

        return (
            <span className={statusClasses[status] || 'status-badge'}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="transaction-history">
            <div className="transaction-header">
                <h3>Transaction History</h3>
                <button className="btn btn-secondary btn-sm">
                    <Download size={16} />
                    Export
                </button>
            </div>

            {/* Filters */}
            <div className="transaction-filters">
                <div className="filter-group">
                    <Filter size={18} />
                    <select
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value, page: 1 })}
                    >
                        <option value="all">All Types</option>
                        <option value="earning">Earnings</option>
                        <option value="withdrawal">Withdrawals</option>
                        <option value="refund">Refunds</option>
                        <option value="payment">Payments</option>
                    </select>
                </div>

                <div className="filter-group">
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
                    >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Transaction List */}
            <div className="transaction-list">
                {loading ? (
                    <div className="transaction-loading">
                        <Loader2 className="animate-spin" size={32} />
                        <p>Loading transactions...</p>
                    </div>
                ) : transactions.length === 0 ? (
                    <div className="transaction-empty">
                        <AlertCircle size={48} />
                        <h4>No transactions found</h4>
                        <p>Your transaction history will appear here</p>
                    </div>
                ) : (
                    <div className="transaction-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction) => (
                                    <tr key={transaction._id}>
                                        <td>
                                            <div className="transaction-type">
                                                {getTransactionIcon(transaction.type)}
                                                <span>{transaction.type}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="transaction-description">
                                                <span className="description-main">
                                                    {transaction.description}
                                                </span>
                                                {transaction.reference && (
                                                    <span className="description-ref">
                                                        Ref: {transaction.reference}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="transaction-date">
                                            {formatDate(transaction.createdAt)}
                                        </td>
                                        <td>
                                            <span className={`transaction-amount ${['credit', 'earning', 'refund'].includes(transaction.type)
                                                    ? 'positive'
                                                    : 'negative'
                                                }`}>
                                                {['credit', 'earning', 'refund'].includes(transaction.type) ? '+' : '-'}
                                                ${Math.abs(transaction.amount).toFixed(2)}
                                            </span>
                                        </td>
                                        <td>
                                            {getStatusBadge(transaction.status)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {!loading && transactions.length > 0 && (
                <div className="transaction-pagination">
                    <button
                        className="btn btn-secondary"
                        onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                        disabled={filters.page === 1}
                    >
                        Previous
                    </button>
                    <span className="page-info">Page {filters.page}</span>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                        disabled={!hasMore}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default TransactionHistory;
