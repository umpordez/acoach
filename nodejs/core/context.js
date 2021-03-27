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
    constructor(userId) {
        V.number(userId, 'userId');
        this.userId = userId;
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

    async loadUser() {
        if (this.user || !this.userId) { return this.user; }
        await this.loadDb();

        const user = this.db.users.oneRow({ id: this.userId });
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
