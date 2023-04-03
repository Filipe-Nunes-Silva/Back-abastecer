const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/validations/handleValidations');
const { VehicleController } = require('../controllers/VehicleController');

const { validateRegisterVehicle } = require('../middlewares/validations/vehicle/register');
const { validateUpdateVehicle } = require('../middlewares/validations/vehicle/update');

router.get('/', VehicleController.getVehicles);
router.get('/:id', VehicleController.getVehicle);
router.post('/', validateRegisterVehicle(), validate, VehicleController.createVehicle);
router.put('/:id', validateUpdateVehicle(), validate, VehicleController.updateVehicle);
router.delete('/:id', VehicleController.deleteVehicle);


module.exports = router;