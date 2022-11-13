import { Errors, GET, Path, QueryParam } from 'typescript-rest'
import { Stock } from '../models/stocks';

@Path('/stock-market')
export class StockMarketService {
  
  @GET
  @Path('/')
  async getBuySellPoints(
    @QueryParam('from') fromTime?: string,
    @QueryParam('to') toTime?: string,
  ): Promise<{ buy: Date, sell: Date }> {
    if (!fromTime || !toTime) {
      throw new Errors.BadRequestError('Missing query params');
    }

    const fromDate = new Date(fromTime);
    const toDate = new Date(toTime);
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      throw new Errors.BadRequestError('Invalida date formats');
    }

    const stocks = await Stock.query().whereBetween('time', [fromDate, toDate]);
    console.log(stocks);

    let bestBuyPoint = null;
    for (let i = 0; i < stocks.length; i++) {
      for (let j = i + 1; j < stocks.length; j++) {
        
      }      
    }
    

    return { buy: new Date(), sell: new Date() };
  }
}