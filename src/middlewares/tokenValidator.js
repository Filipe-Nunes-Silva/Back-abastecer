const { tokenManager } = require('../helpers/tokenManager');

const tokenValidator = async (req, res, next) => {
    if (req.headers['authorization']) {
        const reqToken = await req.headers['authorization'].split(' ')[1];
        const token = await tokenManager.verifyJWT(reqToken);

        if (!token) {
            res.status(401).json({ notallowed: true });
            return;
        };

        req.userId = token.id;
    }
    else {
        res.status(401).json({ notallowed: true });
        return;
    };

    next();
};

module.exports = {
    tokenValidator,
};