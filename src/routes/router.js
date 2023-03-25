const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
router.use('/user', userRoutes);

const authRoutes = require('./auth');
router.use('/access', authRoutes);

module.exports = router;