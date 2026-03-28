const router = require('express').Router();
const authenticate = require('../middleware/auth');
const express = require('express');

const {
  registerUser,
  loginUser,
  logoutUser,
} = require('../controllers/authController');

// REGISTER
router.post('/register', registerUser);

// LOGIN
router.post('/login', loginUser);

// LOGOUT (protected)
router.post('/logout', authenticate, logoutUser);

module.exports = router;
