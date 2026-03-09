const VerificationRequest = require('../models/VerificationRequest');
const Report = require('../models/Report');
const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const Settings = require('../models/Settings');
const Assignment = require('../models/Assignment');
const Job = require('../models/Job');
const Course = require('../models/Course');
const AdminLog = require('../models/AdminLog');
const CourseReview = require('../models/CourseReview');
const User = require('../models/User');
const Order = require('../models/Order');
const Gig = require('../models/Gig');
const { logAdminAction } = require('../utils/adminLogger');
const mongoose = require('mongoose');

/**
 * Get dashboard overview statistics
 */
exports.getDashboardStats = async (req, res) => {
  try {
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const [
      totalUsers,
      newUsersThisMonth,
      activeOrders,
      completedToday,
      pendingVerifications,
      pendingReports,
      revenueResult
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ createdAt: { $gt: monthStart } }),
      Order.countDocuments({ status: { $in: ['pending', 'in_progress'] } }),
      Order.countDocuments({ status: 'completed', updatedAt: { $gt: todayStart } }),
      VerificationRequest.countDocuments({ status: 'pending' }),
      Report.countDocuments({ status: 'pending' }),
      Order.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
      ])
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    // Get recent activity
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(3);
    const recentOrders = await Order.find().populate('buyerId sellerId').sort({ createdAt: -1 }).limit(3);

    const recentActivity = [
      ...recentUsers.map(u => ({ type: 'user', message: `New user registered: ${u.name}`, time: u.createdAt })),
      ...recentOrders.map(o => ({ type: 'order', message: `New order # ${o._id.toString().slice(-6)} placed`, time: o.createdAt }))
    ].sort((a, b) => b.time - a.time).slice(0, 5);

    res.json({
      totalUsers,
      newUsersThisMonth,
      totalRevenue,
      revenueGrowth: 15, // Mock growth for now
      activeOrders,
      completedToday,
      pendingVerifications,
      pendingReports,
      growthRate: 12,
      recentActivity: recentActivity.map(a => ({
        ...a,
        time: formatRelativeTime(a.time)
      }))
    });
  } catch (error) {
    console.error('getDashboardStats error:', error);
    res.status(500).json({ message: 'Error fetching stats' });
  }
};

/**
 * Get users with filtering and pagination
 */
exports.getUsers = async (req, res) => {
  try {
    const { role, status, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (role && role !== 'all') query.roles = role;
    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({
      users,
      total,
      hasMore: total > page * limit
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

/**
 * Update user status (activate, suspend, ban)
 */
exports.updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!['active', 'suspended', 'banned'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const user = await User.findByIdAndUpdate(userId, { status }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    await logAdminAction(req.user.userId, `Update status to ${status}`, 'User', userId, { newStatus: status });

    res.json({ message: `User status updated to ${status}`, user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user status' });
  }
};

/**
 * Get verification requests
 */
exports.getVerificationRequests = async (req, res) => {
  try {
    const { status = 'pending' } = req.query;
    const requests = await VerificationRequest.find({ status })
      .populate('user', 'name email profilePicture')
      .sort({ createdAt: -1 });

    res.json({ requests });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching verification requests' });
  }
};

/**
 * Approve/Reject verification
 */
exports.updateVerificationStatus = async (req, res) => {
  try {
    const { verificationId } = req.params;
    const { status, notes } = req.body;

    const request = await VerificationRequest.findByIdAndUpdate(
      verificationId,
      { status, notes },
      { new: true }
    );

    if (!request) return res.status(404).json({ message: 'Request not found' });

    // If approved, update user's isApprovedByAdmin
    if (status === 'approved') {
      await User.findByIdAndUpdate(request.user, { isApprovedByAdmin: true });
    }

    await logAdminAction(req.user.userId, `${status} verification`, 'VerificationRequest', verificationId, { status, notes });

    res.json({ message: `Verification ${status}`, request });
  } catch (error) {
    res.status(500).json({ message: 'Error updating verification' });
  }
};

/**
 * Get reported content
 */
exports.getReportedContent = async (req, res) => {
  try {
    const { status = 'pending' } = req.query;
    const reports = await Report.find({ status })
      .populate('reporter', 'name')
      .populate('reportedUser', 'name')
      .sort({ createdAt: -1 });

    res.json({ reports });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports' });
  }
};

/**
 * Moderate content
 */
exports.moderateContent = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { action, reason } = req.body;

    const report = await Report.findById(reportId);
    if (!report) return res.status(404).json({ message: 'Report not found' });

    report.status = action === 'dismiss' ? 'dismissed' : 'reviewed';
    await report.save();

    // Take action based on the moderation decision
    if (action === 'ban') {
      await User.findByIdAndUpdate(report.reportedUser, { status: 'banned' });
    }

    await logAdminAction(req.user.userId, `Moderate: ${action}`, 'Report', reportId, { action, reason });

    res.json({ message: 'Moderation action applied', report });
  } catch (error) {
    res.status(500).json({ message: 'Error moderating content' });
  }
};

/**
 * Get platform analytics
 */
exports.getAnalytics = async (req, res) => {
  try {
    const { period = 'month' } = req.query;

    // Basic aggregation for demonstration
    const usersByRole = await User.aggregate([
      { $unwind: '$roles' },
      { $group: { _id: '$roles', count: { $sum: 1 } } }
    ]);

    const totalUsersCount = await User.countDocuments();

    res.json({
      newUsers: 145,
      userGrowth: 12,
      revenue: 5420,
      revenueGrowth: 8,
      orders: 89,
      orderGrowth: -3,
      avgOrderValue: 60.9,
      aovGrowth: 5,
      usersByRole: usersByRole.map(r => ({
        role: r._id,
        count: r.count,
        percentage: ((r.count / totalUsersCount) * 100).toFixed(1)
      })),
      topCategories: [
        { category: 'Development', count: 45, percentage: 40 },
        { category: 'Design', count: 30, percentage: 26 },
        { category: 'Writing', count: 22, percentage: 20 }
      ],
      revenueByType: {
        gigs: 3200,
        gigsPercentage: 59,
        assignments: 1200,
        assignmentsPercentage: 22,
        courses: 620,
        coursesPercentage: 11,
        jobs: 400,
        jobsPercentage: 8
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics' });
  }
};

/**
 * Get transactions for admin overview
 */
exports.getTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const orders = await Order.find({ paymentStatus: 'paid' })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Order.countDocuments({ paymentStatus: 'paid' });

    res.json({
      transactions: orders.map(o => ({
        _id: o._id,
        createdAt: o.createdAt,
        type: 'card',
        amount: o.totalPrice * 100, // Frontend expects cents for fix()
        status: o.status === 'completed' ? 'succeeded' : 'pending'
      })),
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions' });
  }
};

// --- Content Management ---

exports.getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find().populate('sellerId', 'name email').sort({ createdAt: -1 });
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gigs' });
  }
};

exports.deleteGig = async (req, res) => {
  try {
    const { id } = req.params;
    const gig = await Gig.findByIdAndDelete(id);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });

    await logAdminAction(req.user.userId, 'Delete Gig', 'Gig', id, { title: gig.title });
    res.json({ message: 'Gig deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting gig' });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('employerId', 'name email').sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete(id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    await logAdminAction(req.user.userId, 'Delete Job', 'Job', id, { title: job.title });
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job' });
  }
};

exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().populate('studentId', 'name email').sort({ createdAt: -1 });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignments' });
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findByIdAndDelete(id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    await logAdminAction(req.user.userId, 'Delete Assignment', 'Assignment', id, { title: assignment.title });
    res.json({ message: 'Assignment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting assignment' });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('teacherId', 'name email').sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    await logAdminAction(req.user.userId, 'Delete Course', 'Course', id, { title: course.title });
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course' });
  }
};

// --- Financial Management ---

exports.getWithdrawalRequests = async (req, res) => {
  try {
    const requests = await Transaction.find({ type: 'withdrawal', status: 'pending' })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching withdrawals' });
  }
};

exports.updateWithdrawalStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { status, reason } = req.body; // 'completed' or 'failed' (failed should refund)

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    if (transaction.status !== 'pending') return res.status(400).json({ message: 'Already processed' });

    transaction.status = status;
    if (reason) transaction.metadata.reason = reason;
    await transaction.save();

    // If failed, refund the wallet
    if (status === 'failed' || status === 'cancelled') {
      const wallet = await Wallet.findOne({ userId: transaction.userId });
      if (wallet) {
        wallet.availableBalance += Math.abs(transaction.amount);
        await wallet.save();
      }
    }

    await logAdminAction(req.user.userId, `${status} withdrawal`, 'Transaction', transactionId, { status, amount: transaction.amount });

    res.json({ message: `Withdrawal ${status}`, transaction });
  } catch (error) {
    res.status(500).json({ message: 'Error updating withdrawal' });
  }
};

// --- Platform Settings ---

exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.find();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings' });
  }
};

exports.updateSetting = async (req, res) => {
  try {
    const { key, value } = req.body;
    const setting = await Settings.findOneAndUpdate(
      { key },
      { value },
      { upsert: true, new: true }
    );

    await logAdminAction(req.user.userId, `Update setting ${key}`, 'Setting', setting._id, { key, value });
    res.json({ message: `Setting ${key} updated`, setting });
  } catch (error) {
    res.status(500).json({ message: 'Error updating setting' });
  }
};

// --- Logs ---

exports.getAdminLogs = async (req, res) => {
  try {
    const logs = await AdminLog.find()
      .populate('adminId', 'name')
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching logs' });
  }
};

// --- Review Management ---

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await CourseReview.find()
      .populate('userId', 'name email')
      .populate('courseId', 'title')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await CourseReview.findByIdAndDelete(id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    await logAdminAction(req.user.userId, 'Delete Review', 'CourseReview', id, { comment: review.comment });
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review' });
  }
};

// Placeholder for Approve user (from original file)
exports.approveUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndUpdate(userId, { isApprovedByAdmin: true });

    await logAdminAction(req.user.userId, 'Approve User', 'User', userId);

    res.json({ message: 'User approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving user' });
  }
};

// Helper for relative time
function formatRelativeTime(date) {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}
