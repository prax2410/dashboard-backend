const pgp = require("pg-promise")();

const db = pgp(process.env.CREATE_DATABASE_CONNECTION_STRING);

const createDatabase = async function () {
  try {
    const allDatabases = await db.manyOrNone("SELECT datname from pg_database");

    const filteredDatabase = allDatabases.filter(
      (database) => database.datname === "zocket"
    );

    if (!filteredDatabase[0]) {
      await db.none("CREATE DATABASE $1:name", ["zocket"]);
      return "Database created successfully";
    } else {
      return "Database already exists";
    }
  } catch (error) {
    return error.message;
  }
};

module.exports = createDatabase;
