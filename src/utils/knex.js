require('dotenv').config();
const pg = require('pg');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.DBPASSWD,
    database: process.env.DBNAME,
  },
});

module.exports = knex;
