const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/validations/handleValidations');
const { UserController } = require('../controllers/UserController');


const { validateRegisterUser } = require('../middlewares/validations/user/register');
router.post('/new', validateRegisterUser(), validate, UserController.createUser);

router.get('/', UserController.getUsers);

const { validateUpdateUser } = require('../middlewares/validations/user/update');
router.put('/update', validateUpdateUser(), validate, UserController.updateUser);

router.delete('/delete/:id', UserController.deleteUser);



module.exports = router;