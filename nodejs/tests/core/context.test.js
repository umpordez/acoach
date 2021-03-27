require('../test-helper');

const Context = require('../../core/context');
const assert = require('assert');

describe('Tests Context', () => {
    it('sanity check', () => {
        assert(new Context(0, 0));
    });

    it('static .get', async() => {
        const ctx = await Context.get(0);

        assert(ctx);
        assert(ctx.db);
        assert(ctx.db.users);
    });
});
