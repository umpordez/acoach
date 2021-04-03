const Db = require('../core/db');

const util = require('util');
const jwt = require('jsonwebtoken');
const jwtVerifyPromise = util.promisify(jwt.verify);
const { HTTP_SECRET } = process.env;

async function getDbFromRequest(req) {
    if (req.db) { return req.db; }

    req.db = new Db();
    await req.db.buildTableGateways();

    return req.db;
}

async function demandValidJwtMiddleware(req, res, next) {
    try {
        if (!req.headers || !req.headers.authorization) {
            throw new Error('Invalid Auth Token');
        }

        const token = req.headers.authorization.replace('Bearer ', '');

        await jwtVerifyPromise(token, HTTP_SECRET);

        const decoded = jwt.decode(token);
        const { role, accountId, userId } = decoded;

        req.userId = Number(userId);
        req.accountId = Number(accountId);

        const db = await getDbFromRequest(req);
        const user = await db.users.oneRow({
            id: req.userId
        });

        const account = await db.accounts.oneRow({
            id: req.accountId
        });

        req.user = user;
        req.account = account;
        req.role = role;

        return next();
    } catch (ex) {
        ex.statusCode = 401;
        return next(ex);
    }
}

async function demandAccountAccessMiddleware(req, res, next) {
    demandValidJwtMiddleware(req, res, async(err) => {
        if (err) { return next(err); }

        try {
            const db = await getDbFromRequest(req);
            const user = await db.users.oneRow({
                id: req.userId
            });

            req.user = user;

            const account = await db.accounts.oneRow({
                id: req.accountId
            });

            req.account = account;
            if (!account) {
                throw new Error('User has no access to account');
            }

            return next();
        } catch (ex) {
            ex.statusCode = 401;
            return next(ex);
        }
    });
}

function demandAccountRoleMiddleware(role) {
    return function(req, res, next) {
        demandAccountAccessMiddleware(req, res, (error) => {
            if (error) { return next(error); }
            if (req.role === role) { return next(); }

            const err = new Error('Unauthorized');
            err.statusCode = 401;

            next(err);
        });
    };
}

module.exports = {
    demandValidJwtMiddleware,
    demandAccountAccessMiddleware,
    demandAccountRoleMiddleware
};
