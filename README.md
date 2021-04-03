acoach! ([input your name suggestion here](https://github.com/umpordez/acoach/issues/2))
===


Welcome to our monorepo (:

For contributing guidelines, please check [CONTRIBUTING.md](https://github.com/umpordez/acoach/blob/master/CONTRIBUTING.md) or [CODE.md](https://github.com/umpordez/acoach/blob/master/CODE.md) for coding styles.

## Database

We use PostgreSQL for database queries, to install:

- [MacOS](https://gist.github.com/ibraheem4/ce5ccd3e4d7a65589ce84f2a3b7c23a3)
- [Windows](https://www.postgresql.org/download/windows/)
- [Linux](https://www.postgresql.org/download/linux/)

After install PostgreSQL create a database;

```shell
➜  acoach git:(master) ✗ psql
psql (12.2)
Type "help" for help.

acoach=# CREATE DATABASE acoach;
```

---

## Migrations / db creation

We use [`knex migrations`](http://knexjs.org/#Migrations), so to create your db
you can just run `knex migrate:up`, our use the scripts in `scripts/` path.

```shell
./scripts/migrate-up.sh
```


---

## Our path

#### `misc/`

`misc/` is where all sort of random things goes, like requirements, screenshots
ideas... basically, something that is not code related and may be used in future.

#### `mobile/`

Our mobile app is written in react-native (expo)


```shell
cd mobile
npm install
npm start
```


#### `nodejs/`

We currently have only one app server side written in Node.js, it lives in `nodejs/`
and has a `package.json` that will be shared between the possible other apps
(or microservices if you like)

To install dependencies, just run `npm install` in the `nodejs/` path.

```shell
cd nodejs
npm install
```

After install dependencies, configure your `.env` file:

```shell
cp .env.sample .env
vi .env
```

##### `nodejs/api/`

the api app, is what will be receiving all requests from outside world, run it
in the default port or change it in the `web/src/config.js` too.

To run, simple call the `app.js` file;

##### `nodejs/tests/`

all our nodejs test cases lives here, we use `mocha` to run our tests in
nodejs land

#### `scripts/`

`scripts/` has some utilities scripts, like easy way to run `knex` inside
`node_modules` and `run-tests.sh` to run all tests at once, easy pease.


```shell
node nodejs/api/app.js
```

#### `web/`

In web interface we have a simple `create-react-app`, to run locally you can just:

```shell
cd web
npm install
npm start
```

---

## License


Our little acoach is published under no-license, use it at your own will :)
