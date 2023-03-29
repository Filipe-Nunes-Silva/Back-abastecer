const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/validations/handleValidations');
const { VehicleController } = require('../controllers/VehicleController');

router.get('/', VehicleController.getVehicles);

const { validateRegisterVehicle } = require('../middlewares/validations/vehicle/register');
router.post('/', validateRegisterVehicle(), validate, VehicleController.createVehicle);

const { validateUpdateVehicle } = require('../middlewares/validations/vehicle/update');
router.put('/', validateUpdateVehicle(), validate, VehicleController.updateVehicle);

router.delete('/:id', VehicleController.deleteVehicle);


module.exports = router;