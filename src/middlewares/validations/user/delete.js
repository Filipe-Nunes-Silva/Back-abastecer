const { body } = require('express-validator');

function validateDeleteUser() {
    return [

        body('id')
            .exists()
            .withMessage('Id invalido, por favor enviar o id!'),
    ];
};

module.exports = {
    validateDeleteUser,
};