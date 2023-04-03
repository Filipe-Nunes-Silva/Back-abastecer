const { body } = require('express-validator');
const { prisma } = require('../../../db/prisma');


function validateUpdateUser() {
    return [
        body('name')
            .optional()
            .isLength({ min: 3 })
            .withMessage('Nome precisa de 3 ou mais caracteres'),
        body('password')
            .optional()
            .isLength({ min: 3 })
            .withMessage('Senha precisa de 3 ou mais caracteres'),
        body('cpf')
            .optional()
            .isLength({ min: 11 })
            .withMessage('Cpf é incorreto')

        //Verificar se é um cpf valido
    ];
};

module.exports = {
    validateUpdateUser
};