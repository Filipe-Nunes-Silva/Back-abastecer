const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/validations/handleValidations');

const { AuthController } = require('../controllers/AuthController');
const { signin } = require('../middlewares/validations/auth/signin');
router.post('/', signin(), validate, AuthController.signin);


module.exports = router;