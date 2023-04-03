const express = require('express');
const router = express.Router();

const { tokenValidator } = require('../middlewares/tokenValidator');
router.use(tokenValidator);

const authRoutes = require('./auth');
const userRoutes = require('./user');
const vehicleRoutes = require('./vehicle');
const fuelingRoutes = require('./fueling');

router.use('/access', authRoutes);
router.use('/user', userRoutes);
router.use('/vehicle', vehicleRoutes);
router.use('/fueling', fuelingRoutes);

module.exports = router;