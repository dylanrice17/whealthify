const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const config = require('../config/config');

// Generate JWT for doctor
function generateToken(doctor) {
  return jwt.sign({ id: doctor._id, email: doctor.email, name: doctor.name }, config.jwtSecret, { expiresIn: '8h' });
}

// Doctor login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor || doctor.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = generateToken(doctor);
    res.json({ token, doctor: { name: doctor.name, email: doctor.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Middleware to protect doctor routes
exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.doctor = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Get logged-in doctor info
exports.getMe = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.doctor.id).select('-password');
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 