exports.up = function(knex) {
    return knex.raw(`
        CREATE TYPE user_role AS ENUM ('overlord', 'user');
        CREATE TYPE user_access_role AS ENUM ('coach', 'client');

        CREATE SEQUENCE seq_users;
        CREATE TABLE users (
            id int NOT NULL CONSTRAINT pk_users PRIMARY KEY DEFAULT nextval('seq_users'),
            role user_role not null CONSTRAINT df_users_role DEFAULT('user'),

            name text not null,
            email text not null CONSTRAINT uq_users_email UNIQUE,

            password text not null,
            is_active boolean not null,

            karma int not null CONSTRAINT df_users_karma DEFAULT (1),
            profile_img_url text,

            dark_mode boolean CONSTRAINT df_users_dark_mode DEFAULT(false),

            confirmed_email boolean not null CONSTRAINT df_users_confirmed_email DEFAULT(false),
            token text constraint uq_users_token unique,

            utc_last_logon timestamp NULL,
            utc_created_on timestamp NOT NULL CONSTRAINT df_users_utc_created_on DEFAULT (now())
        );
        ALTER SEQUENCE seq_users OWNED BY users.id;
    `);
};

exports.down = function(knex) {
    return knex.raw(`
        drop table users;
        drop type user_role;
        drop type user_access_role;
    `);
};
