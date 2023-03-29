const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/validations/handleValidations');
const { UserController } = require('../controllers/UserController');

router.get('/', UserController.getUsers);

const { validateRegisterUser } = require('../middlewares/validations/user/register');
router.post('/', validateRegisterUser(), validate, UserController.createUser);

const { validateUpdateUser } = require('../middlewares/validations/user/update');
router.put('/', validateUpdateUser(), validate, UserController.updateUser);

router.delete('/:id', UserController.deleteUser);



module.exports = router;