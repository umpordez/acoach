const fs = require('fs');
const path = require('path');
const V = require('argument-validator');
const Db = require('./db');
const { toUpperInitial } = require('./utils');

const allModels = [];

const modelsPath = path.resolve(__dirname, 'models/');
const files = (fs.readdirSync(modelsPath)).filter((f) =>
    (/\.js$/).test(f) && f !== 'base.js');

for (const file of files) {
    const Model = require(path.resolve(modelsPath, file));

    const modelName = file
        .replace(/\.js$/, '')
        .split(/-/g)
        .map((part, idx) => idx > 0 ? toUpperInitial(part) : part)
        .join('');

    allModels.push({ modelName, Model });
}

class Context {
    constructor(userId, accountId = 0) {
        V.number(userId, 'userId');
        V.number(accountId, 'accountId');

        this.userId = userId;
        this.accountId = accountId;
    }

    loadModels() {
        for (const { Model, modelName } of allModels) {
            const instance = new Model(this);
            this[modelName] = instance;
        }
    }

    async loadDb() {
        if (this.db) { return this.db; }

        const db = new Db();
        await db.buildTableGateways();

        this.db = db;

        return db;
    }

    async loadAccount() {
        if (this._account || !this.accountId) { return this._account; }
        await this.loadDb();

        const account = await this.db.accounts.oneRow({ id: this.accountId });
        this._account = account;

        return account;
    }

    async loadUser() {
        if (this.user || !this.userId) { return this._user; }
        await this.loadDb();

        const user = await this.db.users.oneRow({ id: this.userId });
        this._user = user;

        return user;
    }

    static async get(userId) {
        const ctx = new Context(userId);

        ctx.loadModels();
        await ctx.loadDb();

        return ctx;
    }
}

module.exports = Context;
