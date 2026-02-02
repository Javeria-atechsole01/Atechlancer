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
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const profileRoutes = require('./routes/profile.routes');
const gigRoutes = require('./routes/gigs.routes');
const orderRoutes = require('./routes/orders.routes');
const messageRoutes = require('./routes/messages.routes');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/messages', messageRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
