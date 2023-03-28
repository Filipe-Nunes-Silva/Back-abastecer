const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/validations/handleValidations');
const { VehicleController } = require('../controllers/VehicleController');


const { validateRegisterVehicle } = require('../middlewares/validations/vehicle/register');
router.post('/new', validateRegisterVehicle(), validate, VehicleController.createVehicle);

router.get('/', VehicleController.getVehicles);

const { validateUpdateVehicle } = require('../middlewares/validations/vehicle/update');
router.put('/update', validateUpdateVehicle(), validate, VehicleController.updateVehicle);

const { validateDeleteVehicle } = require('../middlewares/validations/vehicle/delete');
router.delete('/delete', validateDeleteVehicle(), validate, VehicleController.deleteVehicle);


module.exports = router;