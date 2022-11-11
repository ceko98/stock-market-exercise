import Knex from 'knex';
import { Model } from 'objection';
import { connection } from '../connection';

const knex = Knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection,
});

Model.knex(knex);

export class BaseModel extends Model { }