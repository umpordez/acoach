const Db = require('../core/db');

after(() => new Db().knex.destroy());
