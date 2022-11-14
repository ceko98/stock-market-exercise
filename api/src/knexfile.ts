import { migrationConnection } from "./connection";

exports.default = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: migrationConnection,
    migrations: {
      directory: './migrations'
    },
    seeds: './seeds',
  },
  test: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: migrationConnection,
    migrations: {
      directory: './migrations'
    },
  },
};
