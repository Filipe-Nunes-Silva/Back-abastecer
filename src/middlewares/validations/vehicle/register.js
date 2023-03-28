const { body } = require('express-validator');

function validateRegisterVehicle() {
    return [

        body('renavam')
            .exists()
            .isLength({ min: 9, max: 11 })
            .withMessage('Renavam tem de 9 a 11 caracteres'),
        body('color')
            .exists()
            .withMessage('Cor é um campo obrigatorio'),
        body('potency')
            .exists()
            .withMessage('Pôtencia é um campo obrigatorio'),
        body('model')
            .exists()
            .withMessage('Modelo é um campo obrigatorio'),
        body('brand')
            .exists()
            .withMessage('Marca é um campo obrigatorio'),
        body('description')
            .optional(),
        body('plate')
            .isLength({ min: 7, max: 7 })
            .withMessage('Campo placa exige 7 caracteres'),
    ];
    //Verificar se é uma placa valida
};

module.exports = {
    validateRegisterVehicle,
};