const router = require('express').Router();
const express = require('express');
const {
  register,
  login,
  logout,
} = require('../controllers/authController');

const authMiddleware = require('../middlewares/authMiddleware');

// REGISTER
router.post('/register', register);

// LOGIN
router.post('/login', login);

// LOGOUT (protected)
router.post('/logout', authMiddleware, logout);

module.exports = router;
