require('dotenv').config();

const pg = require('pg');
const knex = require('knex');

const apiDb = knex({
    client: 'pg',
    connection: {
        host: process.env.API_DB_HOST,
        user: process.env.API_DB_USER,
        password: process.env.API_DB_PASSWORD,
        database: process.env.API_DB_DATABASE
    }
});

module.exports = apiDb;