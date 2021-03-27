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
        const email = `test_${new Date().getTime()}@ligeiro.club`;

        const { user, account } = await userModel.create(
            'testd',
            email,
            'coach',
            '123'
        );

        assert(user);

        await userModel.login(email, '123');
        assert.rejects(() =>
            userModel .login(email, '1234'),
            /invalid password/);

        await userModel.delete(user.id, account.id);
    });
});
