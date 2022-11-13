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

    const stocks = await Stock.query().whereBetween('time', [fromDate, toDate]).orderBy('time');
    if (stocks.length === 0) {
      return { buy: null, sell: null };
    }

    let bestBuyPoint = stocks[0];
    let bestSellPoint = stocks[0];
    for (let buyIdx = 1; buyIdx < stocks.length - 1; buyIdx++) {
      for (let sellIdx = buyIdx + 1; sellIdx < stocks.length; sellIdx++) {
        const currentProfit = stocks[sellIdx].price - stocks[buyIdx].price;
        const currentBestProfit = bestSellPoint.price - bestBuyPoint.price;
        if (currentProfit > currentBestProfit) {
          bestBuyPoint = stocks[buyIdx];
          bestSellPoint = stocks[sellIdx];
        }
      }      
    }

    return { buy: bestBuyPoint, sell: bestSellPoint };
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
}