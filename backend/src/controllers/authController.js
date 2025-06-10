const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const User = require('../models/User');
const config = require('../config/config');

// Initialize SendGrid
sgMail.setApiKey(config.sendgridApiKey);

// Generate verification token
const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Signup controller
exports.signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, state, heightFeet, heightInches, weight, dob, gender } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate verification token
    const verificationToken = generateVerificationToken();
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create new user
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      state,
      heightFeet,
      heightInches,
      weight,
      dob,
      gender,
      verificationToken,
      verificationTokenExpires
    });

    await user.save();

    // Send verification email
    let verificationUrl;
    if (process.env.NODE_ENV === 'production') {
      verificationUrl = `https://whealthify.vercel.app/api/auth/verify/${verificationToken}`;
    } else {
      verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify/${verificationToken}`;
    }
    const msg = {
      to: email,
      from: config.emailFrom,
      subject: 'Verify your Whealthify account',
      html: `
        <h1>Welcome to Whealthify!</h1>
        <p>Please click the link below to verify your email address:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
        <p>This link will expire in 24 hours.</p>
      `
    };

    await sgMail.send(msg);

    res.status(201).json({
      message: 'User created successfully. Please check your email to verify your account.'
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Verify email controller
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ message: 'Error verifying email' });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please verify your email before logging in' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        state: user.state,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
}; 