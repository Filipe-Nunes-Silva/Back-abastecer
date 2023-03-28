const express = require('express');
const router = express.Router();
const { tokenValidator } = require('../middlewares/tokenValidator');


const initialUser = require('./initialUser');
router.use('/initialuser', initialUser);

const authRoutes = require('./auth');
router.use('/access', authRoutes);

const userRoutes = require('./user');
router.use('/user', tokenValidator, userRoutes);

const vehicleRoutes = require('./vehicle');
router.use('/vehicle', tokenValidator, vehicleRoutes);

module.exports = router;