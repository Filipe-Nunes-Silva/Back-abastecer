const express = require('express');
const router = express.Router();
const { tokenValidator } = require('../middlewares/tokenValidator');

const userRoutes = require('./user');
router.use('/user', tokenValidator, userRoutes);

const authRoutes = require('./auth');
router.use('/access', authRoutes);

module.exports = router;