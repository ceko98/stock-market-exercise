import express from 'express';
import { Server } from 'typescript-rest';
import { config } from './config';
import { errorHandler } from './error-handler';
import { StockMarketService } from './service/stock-market';

export const app = express();
const port = config.get('port');

Server.buildServices(app, StockMarketService);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
