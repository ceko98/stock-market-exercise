export interface Stock {
  time: Date;
  price: number;
}

export interface BestPriceResult {
  buy: Stock | null,
  sell: Stock | null,
}
