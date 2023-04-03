const { encryption } = require('../helpers/passwordEncryption');
const { prisma } = require('../db/prisma');

class UserController {

    static async initialUser(req, res) {
        const { name, cpf, password, phone } = req.body;
        let passwordHash = encryption.newPasswordHash(password);

        try {

            const users = await prisma.user.findMany();
            if (users.length > 0) {
                return res.status(401).json({ errors: [{ msg: 'Já existe usúario cadastrado!' }] });
            };

            const user = await prisma.user.create({
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
                    createByUser: true,
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

    static async createUser(req, res) {
        const userId = req.userId;
        const { name, cpf, password, phone } = req.body;
        let passwordHash = encryption.newPasswordHash(password);

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
                    createByUser: true,
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
                    cpf: true,
                    password: false,
                    phone: true,
                    createdAt: true,
                    updateAt: true,
                    createByUser: true,
                }
            });

            return res.status(200).json(users);

        }
        catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Houve algum erro no servidor, tente novamente!' }] });
        };

    };

    static async getUser(req, res) {
        const id = parseInt(req.params.id);

        try {
            const user = await prisma.user.findMany({
                where: {
                    id,
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

            return res.status(200).json(user);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Houve algum erro no servidor, tente novamente!' }] });
        };
    };

    static async updateUser(req, res) {
        const data = req.body;
        const userId = parseInt(req.userId);

        if (data.password) {
            let passwordHash = encryption.newPasswordHash(data.password);
            data.password = passwordHash;
        };

        try {
            const editedUser = await prisma.user.update({
                where: {
                    id: userId,
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

    static async getIdConectadoAPI(req, res) {
        const userId = req.userId;
        res.status(200).json({ id: userId });
    };

    static async deleteUser(req, res) {
        const userId = parseInt(req.userId);

        try {
            const userToBeDeleted = await prisma.user.delete({
                where: {
                    id: userId,
                },
            });

            delete userToBeDeleted.password;

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