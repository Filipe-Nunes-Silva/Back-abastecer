const { encryption } = require('../helpers/passwordEncryption');
const { prisma } = require('../db/prisma');
const { tokenManager } = require('../helpers/tokenManager');

class UserController {

    static async createUser(req, res) {
        const { name, cpf, password, phone } = req.body;
        let passwordHash = encryption.newPasswordHash(password);

        try {

            const user = await prisma.user.create({
                data: {
                    name,
                    cpf,
                    password: passwordHash,
                    phone
                },
                select: {
                    id: true,
                    name: true,
                    cpf: true,
                    password: false,
                    phone: true,
                    createdAt: true,
                    updateAt: true
                },
            });


            return res.status(200).json({ user });

        }
        catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Houve algum erro no servidor, tente novamente!' }] });

        };
    };

    static async getUsers(req, res) {

        try {

            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    password: false,
                    phone: true,
                    createdAt: true,
                    updateAt: true,
                }
            });

            return res.status(200).json({ users });

        }
        catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Houve algum erro no servidor, tente novamente!' }] });
        };

    };

    static async updateUser(req, res) {
        const reqValues = req.body;

        if (reqValues.password) {
            let passwordHash = encryption.newPasswordHash(reqValues.password);
            reqValues.password = passwordHash;
        };

        try {
            const editedUser = await prisma.user.update({
                where: {
                    id: reqValues.id,
                },
                data: reqValues,
            });

            delete editedUser.password;

            return res.status(200).json(editedUser);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Houve algum erro no servidor, tente novamente!' }] });
        };
    };

    static async deleteUser(req, res) {
        const userId = req.userId;
        const { id } = req.body;

        try {
            const userToBeDeleted = await prisma.user.delete({
                where: {
                    id,
                },
            });

            delete userToBeDeleted.password;

            if (userId == id) {
                userToBeDeleted.selfDeleted = true;
            };

            res.status(200).json({ msg: 'sucesso!', user: userToBeDeleted });

        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Houve algum erro no servidor, tente novamente!' }] });
        };
    };
};





module.exports = {
    UserController
};