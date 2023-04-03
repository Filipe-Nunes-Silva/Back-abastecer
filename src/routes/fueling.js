const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/validations/handleValidations');
const { FuelingController } = require('../controllers/FuelingController');

const { validateRegisterFueling } = require('../middlewares/validations/fueling/register');
const { validateUpdateFueling } = require('../middlewares/validations/fueling/update');
router.get('/', FuelingController.getFuelings);
router.get('/:id', FuelingController.getFueling);
router.post('/', validateRegisterFueling(), validate, FuelingController.createFueling);
router.put('/:id', validateUpdateFueling(), validate, FuelingController.updateFueling);
router.delete('/:id', FuelingController.deleteFueling);

module.exports = router;