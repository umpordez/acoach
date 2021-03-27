const logger = require('../core/logger');

function allowCrossDomain(req, res, next) {
    // cors! :x
    res.header('Access-Control-Allow-Origin', process.env.UI_ORIGIN);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Expose-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') { return res.sendStatus(200); }
    next();
}

module.exports = function(app) {
    app.use(allowCrossDomain);

    const _get = app.get;
    const _post = app.post;

    app.post = function(route) {
        logger.info(`Binding route: {POST} ${route}`);
        return _post.apply(this, arguments);
    };
    app.get = function(route) {
        logger.info(`Binding route: {GET} ${route}`);
        return _get.apply(this, arguments);
    };

    require('./endpoints/user')(app);
    require('./endpoints/account')(app);

    app.get = _get;
    app.post = _post;

    app.use(function(req, res) {
        res.status(404).json({
            code: 404,
            error: true,
            msg: 'URL not found'
        });
    });

    app.use(function(err, req, res, next) {
        logger.error(err);

        if (res.headersSent) {
            return next(err);
        }

        const statusCode = err.statusCode || 500;

        res.status(statusCode).json({
            error: true,
            code: statusCode,
            msg: err.msg || err.message || err
        });
    });
};
