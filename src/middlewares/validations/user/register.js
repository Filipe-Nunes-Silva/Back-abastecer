const { body } = require('express-validator');
const { prisma } = require('../../../db/prisma');

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
            }),
        //Verificar se é um cpf valido
    ];
};

module.exports = {
    validateRegisterUser
};