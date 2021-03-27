const V = require('argument-validator');

class ModelBase {
    constructor(context) {
        V.object(context);

        this.db = context.db;
        this.context = this.ctx = context;
    }
}

module.exports = ModelBase;
