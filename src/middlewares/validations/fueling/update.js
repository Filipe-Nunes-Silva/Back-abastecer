const { body } = require('express-validator');

function validateUpdateFueling() {
    return [
        body('amount')
            .optional()
            .exists()
            .withMessage('Quantidade é obrigatorio'),
        body('type')
            .optional()
            .trim()
            .exists()
            .withMessage('Tipo é obrigatorio'),
        body('value')
            .optional()
            .exists()
            .withMessage('Valor é obrigatório'),
        body('userId')
            .optional()
            .custom((value) => {
                if (value) {
                    return Promise.reject('Não autorizado!');
                };
            }),
        body('vehicleId')
            .optional()
            .custom((value) => {
                if (value) {
                    return Promise.reject('Não autorizado!');
                };
            }),
    ];
};

module.exports = {
    validateUpdateFueling,
};