require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { config, validateEnv } = require('./config/env');
const connectDB = require('./config/db');

// Routes
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const profileRoutes = require('./routes/profile.routes');
const gigRoutes = require('./routes/gig.routes');
const orderRoutes = require('./routes/order.routes');
const messageRoutes = require('./routes/messages.routes');
const jobRoutes = require('./routes/job.routes');
const applicationRoutes = require('./routes/application.routes');
const projectRoutes = require('./routes/project.routes');
const paymentRoutes = require('c:/Users/Shani/Desktop/AtechLancer/Atechlancer/backend/src/routes/payment.routes.js');

// Validate environment variables
try {
  validateEnv();
} catch (err) {
  console.error(err.message);
}

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Route Mounting
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/payments', paymentRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error: ' + err.message });
});

const PORT = config.port || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
