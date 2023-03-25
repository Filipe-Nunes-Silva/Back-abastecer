const jwt = require('jsonwebtoken');
require('dotenv').config();


const tokenManager = {

    newUserToken: (data) => {
        const token = jwt.sign({
            id: data.id.toString(),
        }, process.env.SECRET, { expiresIn: '24h' });

        return token;
    },

    verifyJWT: async (token) => {
        try {
            const data = jwt.verify(token, process.env.SECRET);
            return data;
        }
        catch (error) {
            return false;
        };
    },
};


module.exports = {
    tokenManager,
};