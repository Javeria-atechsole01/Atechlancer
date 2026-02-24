const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');

/**
 * Get current user's wallet
 */
exports.getWallet = async (req, res) => {
    try {
        let wallet = await Wallet.findOne({ userId: req.user.userId });

        if (!wallet) {
            wallet = await Wallet.create({ userId: req.user.userId });
        }

        res.json(wallet);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wallet' });
    }
};

/**
 * Request a withdrawal
 */
exports.requestWithdrawal = async (req, res) => {
    try {
        const { amount, method, payoutDetails } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid payout amount' });
        }

        const wallet = await Wallet.findOne({ userId: req.user.userId });
        if (!wallet || wallet.availableBalance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Create pending transaction
        const transaction = await Transaction.create({
            userId: req.user.userId,
            amount: -amount,
            type: 'withdrawal',
            status: 'pending',
            metadata: {
                withdrawalMethod: method,
                payoutDetails
            }
        });

        // Deduct from available, but don't finalize until admin approves
        // Actually, usually we hold it in a 'pending_withdrawal' state or just deduct and fail-back
        wallet.availableBalance -= amount;
        await wallet.save();

        res.json({ message: 'Withdrawal request submitted', transaction });
    } catch (error) {
        res.status(500).json({ message: 'Error processing withdrawal' });
    }
};

/**
 * Get transaction history for user
 */
exports.getTransactions = async (req, res) => {
    try {
        const { type, page = 1, limit = 20 } = req.query;
        const query = { userId: req.user.userId };
        if (type) query.type = type;

        const transactions = await Transaction.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Transaction.countDocuments(query);

        res.json({ transactions, total });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions' });
    }
};

/**
 * Get earnings summary (income vs withdrawals)
 */
exports.getEarningsSummary = async (req, res) => {
    try {
        const { period = 'month' } = req.query;
        const monthStart = new Date();
        monthStart.setDate(1);
        monthStart.setHours(0, 0, 0, 0);

        const income = await Transaction.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user.userId),
                    type: 'payment',
                    status: 'completed',
                    createdAt: { $gt: monthStart }
                }
            },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const withdrawals = await Transaction.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user.userId),
                    type: 'withdrawal',
                    status: 'completed',
                    createdAt: { $gt: monthStart }
                }
            },
            { $group: { _id: null, total: { $sum: { $abs: '$amount' } } } }
        ]);

        const incomeTotal = income.length > 0 ? income[0].total : 0;
        const withdrawalTotal = withdrawals.length > 0 ? withdrawals[0].total : 0;

        res.json({
            income: incomeTotal,
            withdrawals: withdrawalTotal,
            net: incomeTotal - withdrawalTotal
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching earnings summary' });
    }
};
