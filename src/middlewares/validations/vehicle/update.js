const { body } = require('express-validator');

function validateUpdateVehicle() {
    return [

        body('renavam')
            .optional()
            .exists()
            .isLength({ min: 9, max: 11 })
            .withMessage('Renavam tem de 9 a 11 caracteres'),
        body('color')
            .optional()
            .exists()
            .withMessage('Cor é um campo obrigatorio'),
        body('potency')
            .optional()
            .exists()
            .withMessage('Pôtencia é um campo obrigatorio'),
        body('model')
            .optional()
            .exists()
            .withMessage('Modelo é um campo obrigatorio'),
        body('brand')
            .optional()
            .exists()
            .withMessage('Marca é um campo obrigatorio'),
        body('description')
            .optional(),
        body('plate')
            .optional()
            .isLength({ min: 7, max: 7 })
            .withMessage('Campo placa exige 7 caracteres'),
    ];
    //Verificar se é uma placa valida
};

module.exports = {
    validateUpdateVehicle,
};