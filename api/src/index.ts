import cors from 'cors';
import express from 'express';
import { Server } from 'typescript-rest';
import { config } from './config';
import { StockMarketService } from './service/stock-market';

const app = express();
const port = config.get('port');

app.use(cors());
Server.buildServices(app, StockMarketService);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
