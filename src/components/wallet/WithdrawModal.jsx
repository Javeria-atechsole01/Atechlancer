import React, { useState, useEffect } from 'react';
import { walletService } from '../../services/walletService';
import { X, Loader2, AlertCircle, CreditCard, Building } from 'lucide-react';
import '../../pages/wallet/wallet.css';

const WithdrawModal = ({ availableBalance, onClose, onSuccess }) => {
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('');
    const [methods, setMethods] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [loadingMethods, setLoadingMethods] = useState(true);

    useEffect(() => {
        loadWithdrawalMethods();
    }, []);

    const loadWithdrawalMethods = async () => {
        try {
            const data = await walletService.getWithdrawalMethods();
            setMethods(data.methods || []);
            if (data.methods?.length > 0) {
                setMethod(data.methods[0]._id);
            }
        } catch (error) {
            console.error('Failed to load withdrawal methods:', error);
        } finally {
            setLoadingMethods(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const withdrawAmount = parseFloat(amount);

        // Validation
        if (!withdrawAmount || withdrawAmount <= 0) {
            setError('Please enter a valid amount');
            return;
        }

        if (withdrawAmount > availableBalance) {
            setError('Insufficient balance');
            return;
        }

        if (withdrawAmount < 10) {
            setError('Minimum withdrawal amount is $10');
            return;
        }

        if (!method) {
            setError('Please select a withdrawal method');
            return;
        }

        setLoading(true);
        try {
            await walletService.requestWithdrawal({
                amount: withdrawAmount,
                methodId: method
            });

            onSuccess();
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to request withdrawal');
        } finally {
            setLoading(false);
        }
    };

    const getMethodIcon = (type) => {
        switch (type) {
            case 'bank':
                return <Building size={20} />;
            case 'card':
                return <CreditCard size={20} />;
            default:
                return <DollarSign size={20} />;
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Withdraw Earnings</h2>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="withdraw-form">
                    <div className="available-balance-info">
                        <span>Available Balance:</span>
                        <strong>${availableBalance.toFixed(2)}</strong>
                    </div>

                    {error && (
                        <div className="error-message">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="amount">Withdrawal Amount</label>
                        <div className="input-with-prefix">
                            <span className="input-prefix">$</span>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                step="0.01"
                                min="10"
                                max={availableBalance}
                                required
                            />
                        </div>
                        <span className="input-hint">Minimum withdrawal: $10.00</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="method">Withdrawal Method</label>
                        {loadingMethods ? (
                            <div className="methods-loading">
                                <Loader2 className="animate-spin" size={20} />
                                <span>Loading methods...</span>
                            </div>
                        ) : methods.length === 0 ? (
                            <div className="no-methods">
                                <p>No withdrawal methods added yet.</p>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {/* Navigate to add method */ }}
                                >
                                    Add Withdrawal Method
                                </button>
                            </div>
                        ) : (
                            <select
                                id="method"
                                value={method}
                                onChange={(e) => setMethod(e.target.value)}
                                required
                            >
                                {methods.map((m) => (
                                    <option key={m._id} value={m._id}>
                                        {m.type === 'bank' ? '🏦' : '💳'} {m.name} - {m.last4 ? `****${m.last4}` : m.accountNumber}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="withdrawal-info">
                        <p>
                            <strong>Processing Time:</strong> 3-5 business days
                        </p>
                        <p>
                            <strong>Fee:</strong> Free for withdrawals over $50, $2 fee for smaller amounts
                        </p>
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading || methods.length === 0}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    Processing...
                                </>
                            ) : (
                                'Request Withdrawal'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WithdrawModal;
