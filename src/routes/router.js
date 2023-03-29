const express = require('express');
const router = express.Router();


const { tokenValidator } = require('../middlewares/tokenValidator');
router.use(tokenValidator);


const initialUser = require('./initialUser');
router.use('/initialuser', initialUser);

const authRoutes = require('./auth');
router.use('/access', authRoutes);

const userRoutes = require('./user');
router.use('/user', userRoutes);

const vehicleRoutes = require('./vehicle');
router.use('/vehicle', vehicleRoutes);

const fuelingRoutes = require('./fueling');
router.use('/fueling', fuelingRoutes);

module.exports = router;