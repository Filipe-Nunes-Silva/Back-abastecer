const { tokenManager } = require('../helpers/tokenManager');

const allRoutes = {
    '/initialuser': {
        post: { protected: false },
    },
    '/access': {
        post: { protected: false },
    },
    '/user': {
        get: { protected: true },
        post: { protected: true },
        put: { protected: true },
        delete: { protected: true },
    },
    '/user/getid': {
        get: { protected: true },
    },
    '/vehicle': {
        get: { protected: false },
        post: { protected: true },
        put: { protected: true },
        delete: { protected: true },
    },
    '/fueling': {
        get: { protected: false },
        post: { protected: true },
        put: { protected: true },
        delete: { protected: true },
    },
};

const tokenValidator = async (req, res, next) => {

    const route = allRoutes[req.path]?.[req.method.toLowerCase()];
    if (route && route.protected) {
        if (req.headers['authorization']) {
            const reqToken = await req.headers['authorization'].split(' ')[1];
            const token = await tokenManager.verifyJWT(reqToken);

            if (!token) {
                return res.status(401).json({ notallowed: true });
            };
            req.userId = token.id;
        }
        else {
            return res.status(401).json({ notallowed: true });
        };
    };

    next();
};

module.exports = {
    tokenValidator,
};