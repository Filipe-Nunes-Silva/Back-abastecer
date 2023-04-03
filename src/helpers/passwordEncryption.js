const bcrypt = require('bcryptjs');

const encryption = {

    newPasswordHash: (pass) => {
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(pass, salt);
        return passwordHash;
    },
    comparePassword: (reqPassword, dbPassword) => {
        const res = bcrypt.compareSync(reqPassword, dbPassword);
        return res;
    },
};

module.exports = {
    encryption,
};