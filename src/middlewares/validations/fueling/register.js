const { body } = require('express-validator');
const { prisma } = require('../../../db/prisma');

function validateRegisterFueling() {
    return [
        body('amount')
            .exists()
            .withMessage('Quantidade é obrigatorio'),
        body('type')
            .trim()
            .exists()
            .withMessage('Tipo é obrigatorio'),
        body('value')
            .exists()
            .withMessage('Valor é obrigatório'),
        body('vehicleId')
            .custom(async (value) => {
                try {
                    const exisVehicle = await prisma.vehicle.findMany({
                        where: {
                            id: value,
                        },
                    });

                    if (exisVehicle.length === 0) {
                        return Promise.reject('Nenhum veículo encontrado!');
                    };

                    return true;
                }
                catch (error) {
                    res.status(500).json({ errors: 'Houve algum erro no servidor, tente novamente!' });
                }
            }),
    ];
};

module.exports = {
    validateRegisterFueling
};