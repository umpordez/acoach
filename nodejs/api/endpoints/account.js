const bodyParser = require('body-parser');
const { demandAccountRoleMiddleware } = require('../middleware');
const { buildHandler } = require('../utils');

module.exports = function(app) {
    app.post(
        '/account/:accountId/clients/upsert',
        demandAccountRoleMiddleware('coach'),
        bodyParser.json(),
        buildHandler(async function(req, res) {
            const clientData = {
                name: req.string('name'),
                email: req.string('email')
            };

            const client = await req.ctx.client.upsert(clientData);

            res.status(200).json({ client });
        }));
};
