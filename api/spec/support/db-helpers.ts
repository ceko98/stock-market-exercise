import { Knex } from "knex";
import { Stock } from "../../src/models/stocks";
import { Stock as StockType } from "../../src/types/stocks";

export async function clear(knex: Knex) {
  await Stock.query(knex).truncate();
}

export async function seed(knex: Knex, initDate: Date) {
  const stocks: StockType[] = [];
  const entriesCount = 10;

  for (let index = 0; index < entriesCount; index++) {
    stocks.push({ price: index, time: new Date(initDate.getTime() + index * 1000) });
  }
  
  await knex.transaction(async trx => {
    for (const stock of stocks) {
      await trx.from('stock').insert(stock);
    }
  });
}