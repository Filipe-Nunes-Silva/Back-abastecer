const { encryption } = require('../helpers/passwordEncryption');
const { prisma } = require('../db/prisma');

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
                }
            });


            return res.status(200).json({ user });

        } catch (error) {
            console.log(error);
            res.status(500).json({ erros: [{ msg: 'Houve algum erro no servidor, tente novamente!' }] });

        };
    };

};




module.exports = {
    UserController
};