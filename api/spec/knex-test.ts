import Knex from "knex";
import { config } from "../src/config";
import { connection } from "./connection";

export const knex = Knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: { filename: `../../${config.get('test').file}`},
});
