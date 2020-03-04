require('dotenv').config();

const mysql = require('mysql');
const knex = require('knex');

const subredditDb = knex({
    client: 'mysql',
    connection: {
        host: process.env.SUBREDDIT_DB_HOST,
        user: process.env.SUBREDDIT_DB_USER,
        password: process.env.SUBREDDIT_DB_PASSWORD,
        database: process.env.SUBREDDIT_DB_DATABASE
    }
});

module.exports = subredditDb;