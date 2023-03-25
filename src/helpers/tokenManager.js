const jwt = require('jsonwebtoken');
require('dotenv').config();


const tokenManager = {

    newUserToken: (data) => {
        const token = jwt.sign({
            id: data.id.toString(),
        }, process.env.SECRET, { expiresIn: '24h' });

        return token;
    },
};


module.exports = {
    tokenManager,
};