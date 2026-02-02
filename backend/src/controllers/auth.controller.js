const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { User } = require('../models/User');
const { config } = require('../config/env');
const sendEmail = require('../utils/sendEmail');

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.activeRole, // Keep 'role' as activeRole for backward compat
      roles: user.roles,     // Include all available roles
      isApprovedByAdmin: user.isApprovedByAdmin
    },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists. Please login to manage your roles.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    const initialRole = role || 'student';

    user = new User({
      name,
      email,
      password: hashedPassword,
      roles: [initialRole],        // Initialize with requested role
      activeRole: initialRole,     // Set active role
      verificationToken,
      verificationTokenExpires,
      isEmailVerified: false
    });

    await user.save();

    // Send verification email
    const frontendVerifyUrl = `${config.appBaseUrl}/verify-email?token=${verificationToken}`;
    const apiVerifyUrl = `http://localhost:${config.port}/api/auth/verify-email?token=${verificationToken}`;
    const message = `
      <h1>Email Verification</h1>
      <p>Please click one of the links below to verify your email address:</p>
      <p><a href="${frontendVerifyUrl}" clicktracking=off>${frontendVerifyUrl}</a></p>
      <p><a href="${apiVerifyUrl}" clicktracking=off>${apiVerifyUrl}</a></p>
      <p>This link will expire in 24 hours.</p>
    `;

    try {
      console.log('Email sending to:', email);
      await sendEmail(email, 'Verify Your Email - Atechlancer', message);
    } catch (emailError) {
      console.error('Failed to send verification email', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please check your email to verify your account.'
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({ message: 'Please verify your email address first.' });
    }

    // Migration logic: If user has old schema (no roles array), fix it
    if (!user.roles || user.roles.length === 0) {
      user.roles = [user.role || 'student']; // Use the old 'role' field if available (via mapped object) or default
      user.activeRole = user.role || 'student';
      await user.save();
    }

    const token = generateToken(user);
    res.json({ token, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.switchRole = async (req, res) => {
  try {
    const { targetRole } = req.body;
    const userId = req.user.userId; // From auth middleware

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if user has the role
    if (!user.roles.includes(targetRole)) {
      // Optional: Allow auto-adding role here if policy allows? 
      // For now, let's say they must explicitly "Add Role" first, but for smoother UX, 
      // if they are switching to a standard role like 'freelancer' or 'employer', we might just allow it.
      // Let's AUTO-ADD for now to fulfill the user's "register for multiple roles" request easily.
      if (['student', 'freelancer', 'employer', 'teacher'].includes(targetRole)) {
        user.roles.push(targetRole);
      } else {
        return res.status(403).json({ message: "Role not authorized" });
      }
    }

    user.activeRole = targetRole;
    await user.save();

    const token = generateToken(user);
    res.json({ success: true, token, user });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: 'Invalid or missing token' });
    }

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.isEmailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    // Ensure roles check on verify
    if (!user.roles || user.roles.length === 0) {
      user.roles = [user.activeRole || 'student'];
    }

    await user.save();

    const authToken = generateToken(user);

    res.json({
      success: true,
      message: 'Email verified successfully!',
      token: authToken,
      user
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: 'Email is already verified' });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = verificationTokenExpires;
    await user.save();

    const verificationUrl = `${config.appBaseUrl}/verify-email?token=${verificationToken}`;
    const message = `
      <h1>Email Verification</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationUrl}" clicktracking=off>${verificationUrl}</a>
      <p>This link will expire in 24 hours.</p>
    `;

    // DEV ONLY: Log the link to console for testing without email server
    console.log('================================================');
    console.log('VERIFICATION LINK (Dev Mode):');
    console.log(verificationUrl);
    console.log('================================================');

    await sendEmail(email, 'Verify Your Email - Atechlancer', message);

    res.json({ message: 'Verification email resent' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
