import express from 'express';
import { Server } from 'typescript-rest';
import { StockMarketService } from './service/stock-market';

const app = express();
const port = 3000;

Server.buildServices(app, StockMarketService);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
