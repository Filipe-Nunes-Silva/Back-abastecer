const { body } = require('express-validator');

function signin() {
    return [
        body('cpf')
            .exists()
            .withMessage('Insira o CPF!')
            .isLength({ min: 11 })
            .withMessage('CPF incorreto!'),
        body('password')
            .exists()
            .withMessage('Insira a senha!')
            .isLength({ min: 3 })
            .withMessage('Senha incorreta!')
    ];
};

module.exports = {
    signin,
}