const bodyParser = require('body-parser');
const _ = require('lodash');

const util = require('util');
const jwt = require('jsonwebtoken');
const jwtSignPromise = util.promisify(jwt.sign);

const { HTTP_SECRET } = process.env;
const { buildHandler } = require('../utils');

async function getTokenForUser(user, account, role, rememberme) {
    const tokenData = {
        userId: user.id,
        accountId: account.id,
        utcLastLogon: user.utcLastLogon,
        role,
        rememberme
    };
    const token = await jwtSignPromise(tokenData, HTTP_SECRET);

    return token;
}

module.exports = function(app) {
    app.post('/sign-up',
        bodyParser.json(),
        buildHandler(async function(req, res) {
            const name = req.string('name');
            const email = req.string('email');
            const password = req.string('password');

            const { user, account } = await req.ctx.user.create(
                name,
                email,
                'coach',
                password
            );

            req.user = user;
            res.status(200).json({
                account,
                user: {
                    ..._.pick(user,
                        'id',
                        'name',
                        'karma',
                        'email',
                        'dark_mode'
                    ),
                    role: 'coach'
                },

                token: await getTokenForUser(user, account, role, true)
            });
        }));

    app.post('/login',
        bodyParser.json(),
        buildHandler(async function(req, res) {
            try {
                const email = req.string('email');
                const password = req.string('password');
                const { role, user, account } = await req.ctx.user.login(email, password);

                if (!user.confirmed_email) {
                    return res.status(400).json({
                        mustConfirmEmail: true,
                        msg: 'Must confirm email before access app'
                    });
                }

                req.user = user;
                res.status(200).json({
                    account,
                    role,
                    user: _.pick(user,
                        'id', 'name', 'karma', 'email', 'role', 'dark_mode'),

                    token: await getTokenForUser(user, account, role, true)
                });
            } catch (ex) {
                if ((/Invalid|find login|oneRow/).test(ex.message)) {
                    ex.statusCode = 400;
                }

                throw ex;
            }
        }));
};
