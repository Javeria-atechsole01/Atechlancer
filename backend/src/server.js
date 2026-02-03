require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { config, validateEnv } = require('./config/env');
const connectDB = require('./config/db');

// Validate environment variables
try {
  validateEnv();
} catch (err) {
  console.error(err.message);
  // We don't exit process here to allow development with missing optional vars, 
  // but strictly for production it should exit.
}

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
<<<<<<< HEAD
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/profile', require('./routes/profile.routes'));
app.use('/api/gigs', require('./routes/gig.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/jobs', require('./routes/job.routes'));
app.use('/api', require('./routes/payment.routes'));
app.use('/api', require('./routes/application.routes'));
=======
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const profileRoutes = require('./routes/profile.routes');
const gigRoutes = require('./routes/gig.routes');
const orderRoutes = require('./routes/order.routes');
const messageRoutes = require('./routes/messages.routes');
// const jobRoutes = require('./routes/job.routes');
const applicationRoutes = require('./routes/application.routes');
const projectRoutes = require('./routes/project.routes');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/projects', projectRoutes);
>>>>>>> ddb7b09595525bd3df0290c7dfb032ed30fc1fc5

// Base route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error: ' + err.message });
});

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
