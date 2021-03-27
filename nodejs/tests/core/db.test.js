require('../test-helper');

const Db = require('../../core/db');
const assert = require('assert');

describe('Tests Db', () => {
    it('sanity check', () => {
        assert(new Db());
    });

    it('buildTableGateways', async() => {
        const db = new Db();
        assert(!db.users);

        await db.buildTableGateways();

        assert(db.users);
        assert(db.users.oneRow);
    });


    it('insert / delete / tryOneRow / oneRow user', async() => {
        const db = new Db();
        assert(!db.users);

        await db.buildTableGateways();

        const user = await db.users.insertOne({
            name: 'Test user',
            is_active: false,
            email: 'test123@ligeiro.club',
            password: '123',
            role: 'user'
        });

        assert(user);
        assert(user.id);

        assert(await db.users.tryOneRow({ id: user.id }));
        assert(await db.users.oneRow({ id: user.id }));

        await db.users.deleteOne({ id: user.id });
        assert(!await db.users.tryOneRow({ id: user.id }));
    });
});
