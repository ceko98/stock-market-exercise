import { connection } from "./connection";

exports.default = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection,
    migrations: './migrations',
    seeds: './seeds',
  },
};
