import { Knex } from "knex";

export async function seed(knex: Knex) {
  const a = await knex('stock').select();
  console.log(a.length);
  
  await knex('stock').truncate();

  const startDate = new Date('2022-11-10');
  const endDate = new Date('2022-11-11');
  const totalSeconds = (endDate.getTime() - startDate.getTime()) / 1000;

  const totalTimes = Array.from({ length: totalSeconds }, (_, i) => startDate.getTime() + (1000 * i));
  totalTimes.forEach(async time => {
      const price = Math.random() * 10;
      await knex('stock').insert({ price, time: new Date(time) });
  });
}