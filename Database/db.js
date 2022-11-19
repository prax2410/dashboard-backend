const pgp = require("pg-promise")();

const connectionString = process.env.CREATE_TABLE_CONNECTION_STRING;

const db = pgp(connectionString);

module.exports = db;
