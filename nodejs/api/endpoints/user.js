const bodyParser = require('body-parser');
const _ = require('lodash');

const util = require('util');
const jwt = require('jsonwebtoken');
const jwtSignPromise = util.promisify(jwt.sign);

const { HTTP_SECRET } = process.env;
const { buildHandler } = require('../utils');

async function getTokenForUser(user, rememberme) {
    const tokenData = {
        userId: user.id,
        utcLastLogon: user.utcLastLogon,
        rememberme
    };
    const token = await jwtSignPromise(tokenData, HTTP_SECRET);

    return token;
}

module.exports = function(app) {
    app.post('/login',
        bodyParser.json(),
        buildHandler(async function(req, res) {
            try {
                const email = req.string('email');
                const password = req.string('password');

                if (!email || !password) {
                    return res.status(400).json({
                        validationError: true,
                        msg: 'Invalid request'
                    });
                }

                const user = await req.ctx.user.login(email, password);

                if (!user.confirmed_email) {
                    return res.status(400).json({
                        mustConfirmEmail: true,
                        msg: 'Must confirm email before access app'
                    });
                }

                req.user = user;

                res.status(200).json({
                    user: _.pick(user,
                        'id', 'name', 'karma', 'email', 'role', 'dark_mode'),

                    token: await getTokenForUser(user, true)
                });
            } catch (ex) {
                if ((/Invalid|find login|oneRow/).test(ex.message)) {
                    ex.statusCode = 400;
                }

                throw ex;
            }
        }));
};
