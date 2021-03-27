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
            dark_mode boolean CONSTRAINT df_users_dark_mode DEFAULT(false),

            confirmed_email boolean not null CONSTRAINT df_users_confirmed_email DEFAULT(false),
            token text constraint uq_users_token unique,

            utc_last_logon timestamp NULL,
            utc_created_on timestamp NOT NULL CONSTRAINT df_users_utc_created_on DEFAULT (now())
        );
        ALTER SEQUENCE seq_users OWNED BY users.id;

        CREATE SEQUENCE seq_accounts;
        CREATE TABLE accounts (
            id int NOT NULL CONSTRAINT pk_accounts PRIMARY KEY DEFAULT nextval('seq_accounts'),

            name text not null,
            utc_created_on timestamp NOT NULL CONSTRAINT df_accounts_utc_created_on DEFAULT (now())
        );
        ALTER SEQUENCE seq_accounts OWNED BY accounts.id;

        CREATE TABLE user_access (
            user_id int not null constraint fk_user_access_users references users(id),
            account_id int not null constraint fk_user_access_accounts references accounts(id),

            role user_access_role not null,

            constraint pk_user_access primary key (user_id, account_id, role),
            utc_created_on timestamp NOT NULL CONSTRAINT df_user_access_utc_created_on DEFAULT (now())
        );

        CREATE SEQUENCE seq_clients;
        CREATE TABLE clients (
            id int NOT NULL CONSTRAINT pk_clients PRIMARY KEY DEFAULT nextval('seq_clients'),

            name text not null,
            email text not null,

            cpf text,
            rg text,
            birth_date date,

            address text,
            district text,
            zip_code text,
            city text,
            state text,

            company text,
            utc_created_on timestamp NOT NULL CONSTRAINT df_clients_utc_created_on DEFAULT (now())
        );
        ALTER SEQUENCE seq_clients OWNED BY clients.id;

        CREATE SEQUENCE seq_client_reports;
        CREATE TABLE client_reports (
            id int NOT NULL CONSTRAINT pk_client_reports PRIMARY KEY DEFAULT nextval('seq_client_reports'),
            client_id int not null constraint fk_client_reports_clients references clients(id),

            report text,
            feedback text,
            details text,

            name text not null,
            utc_created_on timestamp NOT NULL CONSTRAINT df_client_reports_utc_created_on DEFAULT (now())
        );
        ALTER SEQUENCE seq_client_reports OWNED BY client_reports.id;

        CREATE SEQUENCE seq_client_report_tasks;
        CREATE TABLE client_report_tasks (
            id int NOT NULL CONSTRAINT pk_client_report_tasks PRIMARY KEY DEFAULT nextval('seq_client_reports'),
            report_id int not null constraint fk_client_report_tasks_report references client_reports(id),

            task_description text,

            notify_coach_on timestamp,
            notify_client_on timestamp,

            utc_created_on timestamp NOT NULL CONSTRAINT df_client_report_tasks_utc_created_on DEFAULT (now())
        );
        ALTER SEQUENCE seq_client_report_tasks OWNED BY client_report_tasks.id;
    `);
};

exports.down = function(knex) {
    return knex.raw(`
        drop table user_access;
        drop table client_report_tasks;
        drop table client_reports;
        drop table clients;
        drop table accounts;

        drop table users;
        drop type user_role;
        drop type user_access_role;
    `);
};
