const crypto = require('crypto');
const bcrypt = require('bcrypt');
const V = require('argument-validator');

const ModelBase = require('./base');
const saltRounds = Number(process.env.SALT_ROUNDS || 8);

async function generateAuthToken() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(32, function(err, buf) {
            if (err) { return reject(err); }

            resolve(buf.toString('hex'));
        });
    });
}

class UserModel extends ModelBase {
    async login(email, password) {
        V.string(email);
        V.string(password);

        const user = await this.getUserByEmail(email);
        const isSamePassword = await bcrypt.compare(password, user.password);

        if (!isSamePassword) {
            throw new Error('invalid passsword');
        }

        const userAccess = await this.db.user_access.oneRow({
            user_id: user.id
        });

        const account = await this.db.accounts.oneRow({
            id: userAccess.account_id
        });

        const role = user.role === 'overlord' ? 'overlord' : userAccess.role;
        return { role, user, account };
    }

    async create(name, email, role = 'coach', password) {
        V.string(name);
        V.string(email);
        V.string(role);

        const token = await generateAuthToken();
        const hashedPassword = password ?
            await bcrypt.hash(String(password), saltRounds) :
            'no-password';

        const userData = {
            email,
            name,
            is_active: true,
            confirmed_email: true, // fake it, until you make it :P
            token,
            role: 'user',
            password: hashedPassword
        };

        const user = await this.db.users.insertOne(userData);
        const account = await this.db.accounts.insertOne({ name });

        await this.db.user_access.insertOne({
            user_id: user.id,
            account_id: account.id,
            role
        });

        return { role, user, account }
    }

    async getUserByEmail(email) {
        V.string(email);

        return this.db.users.oneRow({ email });
    }

    async delete(userId, accountId) {
        V.number(userId);
        V.number(accountId);

        await this.db.user_access.deleteAll({
            user_id: userId
        });

        await this.db.noData(`
            delete from
                client_report_tasks
            where
                report_id in (
                    select
                        id
                    from
                        client_reports
                    where
                        client_id in (
                            select
                                id
                            from
                                clients
                            where
                                account_id = ${accountId}
                        )
                );

            delete from
                client_reports
            where
                client_id in (
                    select
                        id
                    from
                        clients
                    where
                        account_id = ${accountId}
                );
        `);

        await this.db.clients.deleteAll({
            account_id: accountId
        });

        await this.db.accounts.deleteAll({ id: accountId });

        await this.db.accounts.deleteAll({
            id: accountId
        });

        await this.db.users.deleteAll({ id: userId });
    }
}

module.exports = UserModel;
