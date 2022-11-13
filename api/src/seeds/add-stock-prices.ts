import { Knex } from "knex";

export async function seed(knex: Knex) {
  await knex('stock').truncate();

  const startDate = new Date('2022-11-10');
  const endDate = new Date('2022-11-13');
  const totalSeconds = (endDate.getTime() - startDate.getTime()) / 1000;

  const totalTimes = Array.from({ length: totalSeconds }, (_, i) => startDate.getTime() + (1000 * i));
  console.log(`Inserting ${totalTimes.length} entries`);
  
  await knex.transaction(async trx => {
    for (const time of totalTimes) {
      const price = Math.random() * 10;
      await trx.from('stock').insert({ price, time: new Date(time) });
    }
  })
}