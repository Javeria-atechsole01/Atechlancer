// Centralized environment configuration and validation
const config = {
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/atechlancer', 
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-jwt-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  appBaseUrl:
    process.env.APP_BASE_URL ||
    `http://localhost:${process.env.PORT || 5000}`,
  cloudinary: {
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.CLOUD_API_KEY,
    apiSecret: process.env.CLOUD_API_SECRET
  }
};

function validateEnv() {
  const required = [
    'MONGO_URI',
    'JWT_SECRET',
    'JWT_EXPIRES_IN',
    'EMAIL_HOST',
    'EMAIL_PORT',
    'EMAIL_USER',
    'EMAIL_PASS'
  ];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    const err = new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
    err.code = 'ENV_VALIDATION_ERROR';
    throw err;
  }
}

module.exports = { config, validateEnv };
