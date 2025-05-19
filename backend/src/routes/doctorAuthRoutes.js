const express = require('express');
const router = express.Router();
const doctorAuthController = require('../controllers/doctorAuthController');

// Doctor login
router.post('/login', doctorAuthController.login);

// Get logged-in doctor info (protected)
router.get('/me', doctorAuthController.authMiddleware, doctorAuthController.getMe);

module.exports = router; 