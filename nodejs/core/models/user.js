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

        if (!isSamePassword) { throw new Error('invalid passsword'); }
        return user;
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
            role,
            password: hashedPassword
        };

        return this.db.users.insertOne(userData);
    }

    async getUserByEmail(email) {
        return this.db.users.oneRow({ email });
    }
}

module.exports = UserModel;
