require('../../test-helper');

const UserModel = require('../../../core/models/user');
const ClientModel = require('../../../core/models/client');
const Context = require('../../../core/context');

const assert = require('assert');

describe('Tests Model Client', async() => {
    let user;
    let account;
    let ctx;

    before(async() => {
        ctx = new Context(0, 0);
        await ctx.loadDb();

        const userModel = new UserModel(ctx);
        const createUserResponse = await userModel.create(
            'testb',
            `testb_${new Date().getTime()}@ligeiro.club`,
            'coach',
            '123'
        );

        user = createUserResponse.user;
        account = createUserResponse.account;

        ctx.userId = user.id;
        ctx.accountId = account.id;

        await ctx.loadUser();
        await ctx.loadAccount();
    });

    after(async() => {
        const userModel = new UserModel(ctx);

        await userModel.delete(user.id, account.id);
    });

    it('sanity check', async() => {
        await ctx.loadDb();
        await ctx.loadUser();
        await ctx.loadAccount();

        assert(new ClientModel(ctx));
    });

    it('creates a client', async() => {
        const clientData = {
            name: 'Foo client',
            email: 'Foo e-mail',
            cpf: '123',
            rg: '123',
            birth_date: '1990-05-08',

            address: 'Foo',
            district: 'bar',
            zip_code: 'zaz',
            city: 'foo',
            state: 'bleh',

            company: 'umpordez.com'
        };

        const clientModel = new ClientModel(ctx);
        const client = await clientModel.upsert(clientData);

        assert(client);
        assert(client.id);
        assert(client.account_id === account.id);
    });

    it('upserts a client', async() => {
        const email = `myClient_${new Date().getTime()}@ligeiro.club`;

        const clientData = {
            email,
            name: 'Foo client',
            cpf: '123',
            rg: '123',
            birth_date: '1990-05-08',

            address: 'Foo',
            district: 'bar',
            zip_code: 'zaz',
            city: 'foo',
            state: 'bleh',

            company: 'umpordez.com'
        };

        const clientModel = new ClientModel(ctx);
        const client = await clientModel.upsert(clientData);

        assert(client);
        assert(client.id);
        assert(client.account_id === account.id);
        assert(client.name === 'Foo client');

        const clientUpdated = await clientModel.upsert({
            email,
            name: 'New name'
        });

        assert(clientUpdated.name === 'New name');
    });

    it('created a few reports', async() => {
        const email = `myClient_${new Date().getTime()}@ligeiro.club`;
        const clientData = { email, name: 'A new test is born' };

        const clientModel = new ClientModel(ctx);
        const client = await clientModel.upsert(clientData);

        await clientModel.addReport(client.id, {
            report: 'foo',
            feedback: 'bar',
            details: 'zaz'
        });

        await clientModel.addReport(client.id, {
            report: 'foo2',
            feedback: 'bar2',
            details: 'zaz2'
        });

        const reports = await ctx.db.client_reports.allRows({
            client_id: client.id
        });

        assert(reports.length === 2);

        assert(reports[0].report === 'foo');
        assert(reports[0].feedback === 'bar');
        assert(reports[0].details === 'zaz');

        assert(reports[1].report === 'foo2');
        assert(reports[1].feedback === 'bar2');
        assert(reports[1].details === 'zaz2');
    });

    it('created a few tasks', async() => {
        const email = `myClient_${new Date().getTime()}@ligeiro.club`;
        const clientData = { email, name: 'A new test is born' };

        const clientModel = new ClientModel(ctx);
        const client = await clientModel.upsert(clientData);

        await clientModel.addReport(client.id, {
            report: 'foo',
            feedback: 'bar',
            details: 'zaz'
        });

        await clientModel.addReport(client.id, {
            report: 'foo2',
            feedback: 'bar2',
            details: 'zaz2'
        });

        const reports = await ctx.db.client_reports.allRows({
            client_id: client.id
        });

        for (const report of reports) {
            const desc = `Test for report ${report.report}`;

            const task = await clientModel.addReportTask(report.id, {
                description: desc,
                notifyCoachOn: '2021-03-27'
            });

            assert(task.id);
            assert(task.task_description === desc);
        }
    });
});
