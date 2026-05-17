const mongoose = require('mongoose');
require('dotenv').config();
const { User } = require('./src/models/User');

async function promote() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/atechlancer');
        const email = 'meetjaveriajavaid@gmail.com';
        const user = await User.findOneAndUpdate(
            { email },
            { $addToSet: { roles: 'admin' }, activeRole: 'admin' },
            { new: true }
        );
        if (user) {
            console.log(`User ${user.email} promoted to admin!`);
            console.log(`Roles: ${user.roles.join(', ')}`);
            console.log(`Active Role: ${user.activeRole}`);
        } else {
            console.log(`User ${email} not found.`);
        }
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}

promote();
