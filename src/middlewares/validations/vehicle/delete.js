const { body } = require('express-validator');

function validateDeleteVehicle() {
    return [

        body('id')
            .exists()
            .withMessage('Id invalido, por favor enviar o id!'),
    ];
};

module.exports = {
    validateDeleteVehicle,
};