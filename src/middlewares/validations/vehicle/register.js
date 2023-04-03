const { body } = require('express-validator');

function validateRegisterVehicle() {
    return [

        body('renavam')
            .isLength({ min: 9, max: 11 })
            .withMessage('Renavam tem de 9 a 11 caracteres'),
        body('color')
            .isLength({ min: 2 })
            .withMessage('Cor é um campo obrigatorio'),
        body('potency')
            .optional(),
        body('model')
            .isLength({ min: 2 })
            .withMessage('Modelo é um campo obrigatorio'),
        body('brand')
            .optional(),
        body('description')
            .optional(),
        body('plate')
            .isLength({ min: 7, max: 7 })
            .withMessage('Campo placa exige 7 caracteres')
            .custom((value) => {
                const regexPlate = /^[a-zA-Z]{3}[0-9]{4}$/;
                const regexPlateMerc = /^[a-zA-Z]{3}[0-9]{1}[a-zA-Z]{1}[0-9]{2}$/;

                const testeregexPlate = regexPlate.test(value);
                const testeregexPlateMerc = regexPlateMerc.test(value)
                if (testeregexPlate) {
                    return true;
                }
                else if (testeregexPlateMerc) {
                    return true;
                }
                else {
                    return Promise.reject('Placa invalída');
                };
            }),
    ];

};

module.exports = {
    validateRegisterVehicle,
};