const mongoose = require('mongoose');
const { config } = require('./env');

const connectDB = async () => {
  const uri = config.mongoUri;
  const options = {
    autoIndex: true,
    maxPoolSize: 10
  };
  try {
    await mongoose.connect(uri, options);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
};

module.exports = connectDB;
