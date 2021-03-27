const V = require('argument-validator');
const logger = require('../core/logger');
const Context = require('../core/context');

function throwValidationError(msg) {
    const error = new Error(msg);

    error.validationError = true;
    error.statusCode = 400;

    throw error;
}

function getUiMessageFromException(ex) {
    const message = ex.message || ex;

    if (/but got no rows/.test(message)) {
        return 'Not found';
    }

    // if we has set status code we expect that message is ready for ui
    if (ex.validationError || ex.statusCode) { return message; }

    if ((/Unexpected|oneRow|allRows|select |updateOne/).test(message)) {
        return [
            'Erro interno em nosso sistema.\n@ligeiro foi acordado e já está',
            'resolvendo esse problema, pedimos desculpas.' ].join(' ');
    }

    return message;
}

const requestExtensions = {
    throwValidationError,

    boolean(key, obj) {
        V.string(key, 'key');

        const value = this.arg(key, obj);
        if (!value) { return false; }

        return true;
    },

    tryArg(key, obj) {
        V.string(key, 'key');

        if (obj) { return obj[key]; }

        for (const arg of [ 'params', 'query', 'body' ]) {
            const val = this[arg] ? this[arg][key] : undefined;

            if (val !== undefined) { return val; }
        }
    },

    arg(key, obj) {
        V.string(key, 'key');

        const val = this.tryArg(key, obj);

        if (val === undefined) {
            throwValidationError(`${key} was not sent`);
        }

        return val;
    },

    number(key, obj) {
        V.string(key, 'key');

        const val = this.arg(key, obj);
        const n = Number(val);

        if (V.isNumber(n)) {
            return n;
        }

        throwValidationError(`${key} must be a number`);
    },

    string(key, obj) {
        V.string(key, 'key');

        const val = this.arg(key, obj);
        return String(val).trim();
    },

    array(key, obj) {
        V.string(key, 'key');
        const val = this.arg(key, obj);

        if (V.isArray(val)) {
            return val;
        }

        throwValidationError(`${key} must be an array`);
    },

    json(key, obj) {
        V.string(key, 'key');
        const val = this.arg(key, obj);

        if (V.isObject(val)) {
            return val;
        }

        try {
            return JSON.parse(val);
        } catch (error) {
            throwValidationError(`Error parsing ${key} as JSON`);
        }
    }
};


function buildHandler(handler) {
    return async(req, res) => {
        try {
            for (const key in requestExtensions) {
                req[key] = requestExtensions[key].bind(req);
            }

            req.userId = req.userId || (req.user && req.user.id);
            req.userInfo = { ip: req.ip, userAgent: req.get('user-agent') };

            const context = new Context((req.user && req.user.id) || 0);

            await context.loadDb();
            await context.loadUser();

            context.loadModels();

            req.context = req.ctx = context;
            req.db = context.db;

            await handler(req, res);
        } catch (ex) {
            if (!ex.validationError && !ex.statusCode) {
                logger.error(ex);
            }

            const uiMessage = getUiMessageFromException(ex);
            const statusCode = ex.statusCode || 500;

            res.status(statusCode).json({
                error: statusCode === 500,
                validationError: statusCode === 400,
                message: uiMessage,
                redirectUrl: ex.redirectUrl
            });
        }
    };
}

module.exports = { buildHandler };
