require('../dotenv');
process.env.TZ = 'UTC';

const logger = require('../core/logger');

const express = require('express');
const app = express();

function fatalHandler(err) {
    logger.error(err, { FATAL: true });
    process.exit(1);
}

process.on('uncaughtException', fatalHandler);
process.on('unhandledRejection', fatalHandler);

app.set('trust proxy', 1);
app.use((req, res, next) => {
    const { ip, method, url } = req;

    const id = new Date().getTime();
    const msg = `[${ip}] {${method}} ${id} - Receiving request ${url}`;

    logger.info(msg);

    res.on('finish', () => {
        logger.info(`[${req.ip}] {${req.method}} ${id} - ` +
            `Response finished ${req.url} with status code: ${res.statusCode}`);
    });

    next();
});

require('./routes')(app);

app.listen(process.env.HTTP_PORT, () => {
    logger.info(`It's alive! http://localhost:${process.env.HTTP_PORT}`);
}).on('error', fatalHandler);
