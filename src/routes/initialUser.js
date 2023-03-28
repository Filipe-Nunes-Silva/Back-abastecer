const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/validations/handleValidations');
const { UserController } = require('../controllers/UserController');


const { validateRegisterUser } = require('../middlewares/validations/user/register');
router.post('/', validateRegisterUser(), validate, UserController.initialUser);

module.exports = router;