require('../../test-helper');

const UserModel = require('../../../core/models/user');
const Context = require('../../../core/context');

const assert = require('assert');

describe('Tests Model User', async() => {
    const ctx = new Context(0);

    it('sanity check', async() => {
        await ctx.loadDb();
        assert(new UserModel(ctx));
    });

    it('create / login / and delete user', async() => {
        const userModel = new UserModel(ctx);
        const user = await userModel.create(
            'testd', 'testd@ligeiro.club', 'overlord', '123'
        );

        assert(user);

        await userModel.login('testd@ligeiro.club', '123');
        assert.rejects(() =>
            userModel .login('testd@ligeiro.club', '1234'),
            /invalid password/);

        await ctx.db.users.deleteOne({ id: user.id });
    });
});
