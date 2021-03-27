const V = require('argument-validator');

class TableGateway {
    constructor(db, tableName) {
        V.object(db, 'db');

        if (tableName) {
            V.string(tableName, 'tableName');
            this.tableName = tableName;
        }

        const { knex } = db;

        this._db = db;
        this.knex = knex;
    }

    allRows(whereObject, columns = '*') {
        if (!whereObject) {
            return this.knex.select(columns).from(this.tableName);
        }

        return this.knex
            .select(columns)
            .from(this.tableName)
            .where(whereObject);
    }

    deleteOne(whereObject) {
        V.object(whereObject);
        return this.knex(this.tableName).where(whereObject).del();
    }

    async tryOneRow(values, columns = '*') {
        V.object(values, 'values');

        const rows = await this.knex.select(columns)
            .from(this.tableName)
            .where(values);

        if (rows.length > 1) {
            const str = JSON.stringify(values);
            throw new Error(`${str} expected oneRow, but got ${rows.length} rows`);
        }

        return rows[0];
    }

    async oneRow(values) {
        V.object(values, 'values');

        const row = await this.tryOneRow(values);
        if (row) { return row; }

        const str = JSON.stringify(values);
        throw new Error(`${str} expected oneRow, but got no rows`);
    }

    async insertOne(values, returning = '*') {
        V.object(values, 'values');

        return (await this.knex(this.tableName)
            .insert(values).returning(returning))[0];
    }

    async updateOne(whereObject, values, returning = '*') {
        V.object(whereObject, 'whereObject');
        V.object(values, 'values');

        return (await this.knex(this.tableName)
            .where(whereObject)
            .update(values)
            .returning(returning))[0];
    }
}

module.exports = TableGateway;
