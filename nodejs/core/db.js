const path = require('path');
const fs = require('fs');
const V = require('argument-validator');

const knex = require('knex')(require('../knexfile'));

const TableGateway = require('./table-gateways/base');
const { toUpperInitial } = require('./utils');

const tableGateways = [];

const tgPath = path.resolve(__dirname, 'table-gateways/');
const files = (fs.readdirSync(tgPath)).filter((f) =>
    (/\.js$/).test(f) && f !== 'base.js');

for (const file of files) {
    const TableGateway = require(path.resolve(tgPath, file));

    const modelName = file
        .replace(/\.js$/, '')
        .split(/-/g)
        .map((part, idx) => idx > 0 ? toUpperInitial(part) : part)
        .join('');

    tableGateways.push({ modelName, TableGateway });
}

let _allTables;
class Db {
    constructor() {
        this.knex = knex;
    }

    addCustomTableGateways() {
        for (const { modelName, TableGateway } of tableGateways) {
            this[modelName] = new TableGateway(this);
        }
    }

    async buildTableGateways() {
        this.addCustomTableGateways();

        const tables = _allTables || await this.allRows(`
            SELECT
                table_schema || '.' || table_name as table
            FROM
                information_schema.tables
            WHERE
                table_type = 'BASE TABLE'
            AND
                table_schema NOT IN ('pg_catalog', 'information_schema');
        `);

        _allTables = tables;

        for (const table of tables) {
            const tableName = table.table.split('.')[1];

            if (this[tableName]) { continue; }

            this[tableName] = new TableGateway(this, tableName);
        }
    }

    async noData(sql) {
        V.string(sql, 'sql');
        await knex.raw(sql);
    }

    async allRows(sql) {
        V.string(sql, 'sql');
        return (await knex.raw(sql)).rows;
    }

    async tryOneRow(sql) {
        V.string(sql, 'sql');

        const { rows } = await knex.raw(sql);
        return rows[0];
    }

    async oneRow(sql) {
        V.string(sql, 'sql');
        const { rows } = await knex.raw(sql);

        if (rows.length === 1) { return rows[0]; }

        if (!rows.length) {
            throw new Error(`${sql} expected oneRow, but got no rows`);
        }

        throw new Error(`${sql} expected oneRow, but got ${rows.length} rows`);
    }
}

module.exports = Db;
