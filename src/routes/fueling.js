const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/validations/handleValidations');
const { FuelingController } = require('../controllers/FuelingController');

const { validateRegisterFueling } = require('../middlewares/validations/fueling/register');
router.post('/new', validateRegisterFueling(), validate, FuelingController.createFueling);

router.get('/', FuelingController.getFuelings);

const { validateUpdateFueling } = require('../middlewares/validations/fueling/update');
router.put('/update', validateUpdateFueling(), validate, FuelingController.updateFueling);

router.delete('/delete/:id', FuelingController.deleteFueling);

module.exports = router;