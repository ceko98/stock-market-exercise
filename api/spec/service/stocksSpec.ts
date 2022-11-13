import chai from 'chai';
import chaiHttp from 'chai-http';
import { Knex as KnexType } from 'knex';
import { app } from '../../src';
import { clear, seed } from '../support/db-helpers';
import Knex from 'knex'

chai.use(chaiHttp);

describe('Stocks service', () => {
  const initSeedDate = new Date('2022-01-01');
  let knex: KnexType;

  beforeAll(async () => {
    knex = Knex({
      client: 'sqlite3',
      useNullAsDefault: true,
      connection: { filename: `./database/test.sqlite`},
    });
    await seed(knex, initSeedDate);
  })
  
  afterAll(async () => await clear(knex));

  describe('get', () => {
    it('without query params', async () => {
      const res = await chai.request(app).get('/stock-market');
      expect(res.status).toBe(400);
    });

    it('with random query params', async () => {
      const res = await chai.request(app).get('/stock-market?from=asd&to=1234');
      expect(res.status).toBe(400);
    });

    it('with invalid date range', async () => {
      const from = new Date('2022-10-10');
      const to = new Date('2022-10-09');
      const res = await chai.request(app)
        .get(`/stock-market?from=${from.toISOString()}&to=${to.toISOString()}`);

      expect(res.status).toBe(400);
    });
  });
});
