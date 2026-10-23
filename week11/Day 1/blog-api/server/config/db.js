const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 12345,
        user: 'postgres',
        password: process.env.DB_PASSWORD,
        database: 'postgres'
    }
});

module.exports = db;