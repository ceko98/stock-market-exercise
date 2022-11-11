import { GET, Path } from 'typescript-rest'

@Path('/stock-market')
export class StockMarketService {
  
  @GET
  @Path('/')
  getBuySellPoints() {
    return 'test';
  }
}