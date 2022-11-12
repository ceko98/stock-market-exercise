import { GET, Path, QueryParam } from 'typescript-rest'
import { Stock } from '../types/stocks';

@Path('/stock-market')
export class StockMarketService {
  
  @GET
  @Path('/')
  getBuySellPoints(
    @QueryParam('from') fromTime: string,
    @QueryParam('to') toTime: string,
  ) {
    const result: Stock = { time: new Date(), price: 100 };
    return { stocks: result };
  }
}