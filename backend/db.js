const knex = require('knex');
const config = require('./knexfile');

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];
const pool = knex(dbConfig);

module.exports = pool;