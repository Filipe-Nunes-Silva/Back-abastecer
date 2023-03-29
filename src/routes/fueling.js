const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/validations/handleValidations');
const { FuelingController } = require('../controllers/FuelingController');

router.get('/', FuelingController.getFuelings);

const { validateRegisterFueling } = require('../middlewares/validations/fueling/register');
router.post('/', validateRegisterFueling(), validate, FuelingController.createFueling);

const { validateUpdateFueling } = require('../middlewares/validations/fueling/update');
router.put('/', validateUpdateFueling(), validate, FuelingController.updateFueling);

router.delete('/:id', FuelingController.deleteFueling);

module.exports = router;