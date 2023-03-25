const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/validations/handleValidations');
const { UserController } = require('../controllers/UserController');


const { register } = require('../middlewares/validations/user/register');
router.post('/new', register(), validate, UserController.createUser);

router.get('/', UserController.getUsers);

const { update } = require('../middlewares/validations/user/update');
router.put('/update', update(), validate, UserController.updateUser);

router.delete('/delete', UserController.deleteUser);



module.exports = router;