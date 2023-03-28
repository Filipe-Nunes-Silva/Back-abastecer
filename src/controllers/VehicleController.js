const { prisma } = require('../db/prisma');

class VehicleController {

    static async createVehicle(req, res) {
        const userId = req.userId;
        const data = req.body;

        data.userId = parseInt(userId);

        try {

            const vehicle = await prisma.vehicle.create({
                data,
            });

            return res.status(200).json(vehicle);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Houve algum erro no servidor, tente novamente!' }] });
        };
    };

    static async getVehicles(req, res) {
        try {
            const vehicles = await prisma.vehicle.findMany();

            res.status(200).json(vehicles);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Houve algum erro no servidor, tente novamente!' }] });
        };
    };

    static async updateVehicle(req, res) {
        const data = req.body;

        try {
            const editedVehicle = await prisma.vehicle.update({
                where: {
                    id: data.id,
                },
                data,
            });

            return res.status(200).json(editedVehicle);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Houve algum erro no servidor, tente novamente!' }] });
        };
    };

    static async deleteVehicle(req, res) {
        const { id } = req.body;

        try {
            const vehicleToBeDeleted = await prisma.vehicle.delete({
                where: {
                    id,
                },
            });

            res.status(200).json({ msg: 'sucesso!', vehicle: vehicleToBeDeleted });

        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Houve algum erro no servidor, tente novamente!' }] });
        };
    };
};

module.exports = {
    VehicleController,
};