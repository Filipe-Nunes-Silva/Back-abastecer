const { body } = require('express-validator');
const { prisma } = require('../../../db/prisma');

function validarCPF(inputCPF) {
    let soma = 0;
    let resto;

    if (inputCPF == '00000000000') return false;
    for (i = 1; i <= 9; i++) soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(inputCPF.substring(9, 10))) return false;

    soma = 0;
    for (i = 1; i <= 10; i++) soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(inputCPF.substring(10, 11))) return false;
    return true;
}

function validateRegisterUser() {
    return [
        body('name')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Nome precisa de 3 ou mais caracteres'),
        body('password')
            .isLength({ min: 3 })
            .withMessage('Senha precisa de 3 ou mais caracteres'),
        body('cpf')
            .exists()
            .withMessage('Cpf é obrigatório')
            .isLength({ min: 11 })
            .withMessage('Cpf é incorreto')
            .custom(async (value) => {
                try {

                    const existCPF = await prisma.user.findMany({
                        where: {
                            cpf: {
                                contains: value,
                            },
                        },
                    });

                    if (existCPF.length > 0) {
                        return Promise.reject('CPF já cadastrado!');
                    };

                    return true;

                } catch (error) {
                    res.status(500).json({ errors: 'Houve algum erro no servidor, tente novamente!' });
                };
            })
            .custom((value) => {
                const cpfIsValid = validarCPF(value);
                if (!cpfIsValid) {
                    return Promise.reject('CPF invalído!');
                };

                return true;
            }),
    ];
};

module.exports = {
    validateRegisterUser
};