const AdminLog = require('../models/AdminLog');

/**
 * Log an administrative action
 * @param {string} adminId - ID of the admin performing the action
 * @param {string} action - Description of the action (e.g., 'Delete Gig')
 * @param {string} targetType - Type of target (User, Gig, etc.)
 * @param {string} targetId - ID of the target object
 * @param {Object} details - Additional JSON details
 */
const logAdminAction = async (adminId, action, targetType, targetId, details = {}) => {
    try {
        await AdminLog.create({
            adminId,
            action,
            targetType,
            targetId,
            details
        });
    } catch (error) {
        console.error('Failed to create admin log:', error);
    }
};

module.exports = { logAdminAction };
