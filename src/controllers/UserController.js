const { encryption } = require('../helpers/passwordEncryption');
const { prisma } = require('../db/prisma');
const { tokenManager } = require('../helpers/tokenManager');

class UserController {

    static async initialUser(req, res) {
        const { name, cpf, password, phone } = req.body;
        let passwordHash = encryption.newPasswordHash(password);

        try {
            const hasCreatedUsers = await prisma.user.findMany();

            if (hasCreatedUsers.length === 0) {

                const firstUser = await prisma.user.create({
                    data: {
                        name,
                        cpf,
                        password: passwordHash,
                        phone,
                        createByUser: 0,
                    },
                    select: {
                        id: true,
                        name: true,
                        cpf: true,
                        password: false,
                        phone: true,
                        createdAt: true,
                        updateAt: true,
                        createByUser: true,
                    },
                });

                return res.status(200).json(firstUser);
            }
            else {
                return res.status(401).json({ error: 'Já existe usuários criado, faça login e tente novamente!' });
            };
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Houve algum erro no servidor, tente novamente!' }] });
        };
    };

    static async createUser(req, res) {
        const { name, cpf, password, phone } = req.body;
        let passwordHash = encryption.newPasswordHash(password);
        const userId = req.userId;

        try {

            const user = await prisma.user.create({
                data: {
                    name,
                    cpf,
                    password: passwordHash,
                    phone,
                    createByUser: parseInt(userId),
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

            return res.status(200).json(user);

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

            return res.status(200).json(users);

        }
        catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Houve algum erro no servidor, tente novamente!' }] });
        };

    };

    static async updateUser(req, res) {
        const data = req.body;

        if (data.password) {
            let passwordHash = encryption.newPasswordHash(data.password);
            data.password = passwordHash;
        };

        try {
            const editedUser = await prisma.user.update({
                where: {
                    id: data.id,
                },
                data,
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
        const userId = parseInt(req.userId);
        const id = parseInt(req.params.id);

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