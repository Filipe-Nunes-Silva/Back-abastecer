const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/validations/handleValidations');
const { UserController } = require('../controllers/UserController');

const { validateRegisterUser } = require('../middlewares/validations/user/register');
const { validateUpdateUser } = require('../middlewares/validations/user/update');

router.get('/', UserController.getUsers);
router.get('/getid', UserController.getIdConectadoAPI);
router.get('/:id', UserController.getUser);
router.post('/', validateRegisterUser(), validate, UserController.createUser);
router.put('/', validateUpdateUser(), validate, UserController.updateUser);
router.delete('/', UserController.deleteUser);



module.exports = router;