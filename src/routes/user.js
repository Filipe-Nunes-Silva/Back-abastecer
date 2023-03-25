const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/validations/handleValidations');


const { UserController } = require('../controllers/UserController');
const { register } = require('../middlewares/validations/user/register');
router.post('/new', register(), validate, UserController.createUser);



module.exports = router;