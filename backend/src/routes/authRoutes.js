const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Signup route
router.post('/signup', authController.signup);

// Email verification route
router.get('/verify/:token', authController.verifyEmail);

// Login route
router.post('/login', authController.login);

module.exports = router; 