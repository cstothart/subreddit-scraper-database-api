require('dotenv').config();

const mysql = require('mysql');
const knex = require('knex');

const db = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        connectionString: process.env.DATABASE_URL
    }
});

module.exports = db;