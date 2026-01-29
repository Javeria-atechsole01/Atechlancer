const nodemailer = require('nodemailer');

/**
 * Send an email using SMTP credentials from environment variables.
 * Required env:
 * - EMAIL_HOST
 * - EMAIL_PORT
 * - EMAIL_USER
 * - EMAIL_PASS
 * Optional:
 * - EMAIL_SECURE (true/false)
 * - EMAIL_FROM (e.g., "Atechlancer <no-reply@atechlancer.com>")
 */
async function sendEmail({ to, subject, html }) {
  const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_SECURE,
    EMAIL_FROM
  } = process.env;

  if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
    throw new Error('SMTP configuration is missing');
  }

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: String(EMAIL_SECURE).toLowerCase() === 'true',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  const info = await transporter.sendMail({
    from: EMAIL_FROM || 'Atechlancer <no-reply@atechlancer.local>',
    to,
    subject,
    html
  });

  return info;
}

module.exports = { sendEmail };
