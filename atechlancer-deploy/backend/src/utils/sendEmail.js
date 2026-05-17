const nodemailer = require('nodemailer');
const { config } = require('../config/env');

const transporter = nodemailer.createTransport(
  config.email.host === 'smtp.gmail.com'
    ? {
        service: 'gmail',
        auth: {
          user: config.email.user,
          pass: config.email.pass
        }
      }
    : {
        host: config.email.host,
        port: config.email.port,
        secure: false,
        auth: {
          user: config.email.user,
          pass: config.email.pass
        }
      }
);

const sendEmail = async (to, subject, html) => {
  try {
    console.log('Email sending to:', to);
    const info = await transporter.sendMail({
      from: `"Atechlancer" <${config.email.user}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      html // html body
    });

    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
