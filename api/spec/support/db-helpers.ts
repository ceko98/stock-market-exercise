import { Stock } from "../../src/models/stocks";
import { Stock as StockType } from "../../src/types/stocks";

export async function seed() {
  const initDate = new Date('2022-01-01');
  const stocks: StockType[] = [];
  const prices = [100, 13, 1, 6, 1, 6, 3, 5, 11, 55, 65, 2];

  prices.forEach((price, idx) => {
    const time = new Date(initDate.getTime() + idx * 1000);
    stocks.push({ price , time });
  })
  
  await Stock.transaction(async trx => {
    for (const stock of stocks) {
      await Stock.query(trx).insert(stock);
    }
  });
}

export async function clear() {
  await Stock.query().truncate();
}
