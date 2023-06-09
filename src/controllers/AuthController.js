const { prisma } = require('../db/prisma');
const { encryption } = require('../helpers/passwordEncryption');
const { tokenManager } = require('../helpers/tokenManager');

class AuthController {

    static async signin(req, res) {

        const { cpf, password } = req.body;
        try {
            const [user] = await prisma.user.findMany({
                where: {
                    cpf: {
                        contains: cpf,
                    },
                },
            });

            if (!user || user.length == 0) {
                return res.status(401).json({ errors: [{ msg: 'CPF e/ou senha errados!' }] });
            };

            const matchPassword = encryption.comparePassword(password, user.password);
            if (!matchPassword) {
                return res.status(401).json({ errors: [{ msg: 'CPF e/ou senha errados!' }] });
            };

            const newToken = tokenManager.newUserToken(user);
            return res.status(200).json({ token: newToken, cpf: user.cpf });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Houve algum erro no servidor, tente novamente!' }] });
        }

    };

};


module.exports = {
    AuthController
};