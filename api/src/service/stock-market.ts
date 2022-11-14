import { Errors, GET, Path, QueryParam } from 'typescript-rest'
import { Stock } from '../models/stocks';

@Path('/stock-market')
export class StockMarketService {
  
  @GET
  @Path('/')
  async getBuySellPoints(
    @QueryParam('from') fromTime?: string,
    @QueryParam('to') toTime?: string,
  ): Promise<{ buy: Stock | null, sell: Stock | null }> {
    if (!fromTime || !toTime) {
      throw new Errors.BadRequestError('Missing query params');
    }

    const fromDate = new Date(fromTime);
    const toDate = new Date(toTime);
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      throw new Errors.BadRequestError('Invalida date formats');
    }
    if (fromDate.getTime() > toDate.getTime()) {
      throw new Errors.BadRequestError('Invalida date range. From date must be before to date.');
    }

    const { start, end } = await this.getTimeRange();
    if (fromDate.getTime() < start.getTime() || toDate.getTime() > end.getTime()) {
      throw new Errors.BadRequestError('Invalida date range. Dates out of bound.');
    }

    const stocks = await Stock.query()
      .whereBetween('time', [fromDate, toDate])
      .orderBy('time');

    if (stocks.length === 0) {
      return { buy: null, sell: null };
    }
    if (stocks.length === 1) {
      return { buy: stocks[0], sell: stocks[0] };
    }
    const { profitMax, profitMin } = this.maxStockDiff(stocks);
    
    return { buy: profitMax, sell: profitMin };
  }

  @GET
  @Path('/range')
  async getDataTimeRange(): Promise<{ start: Date, end: Date }> {
    return this.getTimeRange();
  }

  private async getTimeRange() {
    const range = await Stock.knexQuery()
      .min('time as start')
      .max('time as end')
      .first();

    return { start: new Date(range?.start), end: new Date(range?.end) };
  }

  private maxStockDiff(stocks: Stock[]) {
    let max = stocks[0];
    let min = stocks[0];
    let maxProfit = -Infinity;
    
    let profitMax = stocks[0];
    let profitMin = stocks[0];
    
    for (let i = 1; i < stocks.length; i++) {
        if (stocks[i].price > max.price) {
            max = stocks[i];
            maxProfit = Math.max(max.price - min.price, maxProfit);
            profitMax = max
            profitMin = min
        } else if (stocks[i].price < min.price){
            min = stocks[i];
            max = stocks[i];
        }
    }
    return { profitMax, profitMin };
  }
}