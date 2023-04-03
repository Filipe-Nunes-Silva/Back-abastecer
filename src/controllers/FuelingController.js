const { prisma } = require('../db/prisma');

class FuelingController {

    static async createFueling(req, res) {
        const userId = req.userId;
        const data = req.body;

        data.vehicleId = parseInt(data.vehicleId);
        data.userId = parseInt(userId);

        try {
            const fueling = await prisma.fueling.create({
                data,
            });

            return res.status(200).json(fueling);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Houve algum erro no servidor, tente novamente!' }] });
        };

    };

    static async getFuelings(req, res) {
        try {
            const fuelings = await prisma.fueling.findMany();

            res.status(200).json(fuelings);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Houve algum erro no servidor, tente novamente!' }] });
        };
    };

    static async getFueling(req, res) {
        const id = parseInt(req.params.id);
        try {
            const fueling = await prisma.fueling.findMany({
                where: {
                    id: id,
                },
            });

            res.status(200).json(fueling);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Houve algum erro no servidor, tente novamente!' }] });
        };
    };

    static async updateFueling(req, res) {
        const data = req.body;
        const id = parseInt(req.params.id);

        try {
            const editedFueling = await prisma.fueling.update({
                where: {
                    id: id,
                },
                data,
            });

            return res.status(200).json(editedFueling);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Houve algum erro no servidor, tente novamente!' }] });
        };
    };

    static async deleteFueling(req, res) {

        const id = parseInt(req.params.id);

        try {
            const fuelingToBeDeleted = await prisma.fueling.delete({
                where: {
                    id,
                },
            });

            res.status(200).json({ msg: 'sucesso!', vehicle: fuelingToBeDeleted });

        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Houve algum erro no servidor, tente novamente!' }] });
        };
    };
};

module.exports = {
    FuelingController,
};