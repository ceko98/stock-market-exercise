import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../src';
import { clear, seed } from '../support/db-helpers';

chai.use(chaiHttp);

describe('Stocks service', () => {
  beforeAll(async () => {
    await seed();
  })
  
  afterAll(async () => await clear());

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


    it('with whole range', async () => {
      const from = new Date('2022-01-01');
      const to = new Date(from.getTime() + 11 * 1000);
      const res = await chai.request(app)
        .get(`/stock-market?from=${from.toISOString()}&to=${to.toISOString()}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        buy: jasmine.objectContaining({ price: 1 }),
        sell: jasmine.objectContaining({ price: 65 }),
      });
    });

    it('with single point as range', async () => {
      const from = new Date('2022-01-01');
      const to = new Date('2022-01-01');
      const res = await chai.request(app)
        .get(`/stock-market?from=${from.toISOString()}&to=${to.toISOString()}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        buy: jasmine.objectContaining({ price: 100 }),
        sell: jasmine.objectContaining({ price: 100 }),
      });
    });

    it('should return single point if all ahead are smaller', async () => {
      const initDate = new Date('2022-01-01');
      // Get the last two points
      const from = new Date(initDate.getTime() + 10 * 1000);
      const to = new Date(initDate.getTime() + 11 * 1000);
      const res = await chai.request(app)
        .get(`/stock-market?from=${from.toISOString()}&to=${to.toISOString()}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        buy: jasmine.objectContaining({ price: 65, time: initDate.getTime() + 10 * 1000 }),
        sell: jasmine.objectContaining({ price: 65, time: initDate.getTime() + 10 * 1000 }),
      });
    });

    it('should return first of two solutions', async () => {
      const initDate = new Date('2022-01-01');
      // Get the [1,6,1,6] slice
      const from = new Date(initDate.getTime() + 2 * 1000);
      const to = new Date(initDate.getTime() + 5 * 1000);
      const res = await chai.request(app)
        .get(`/stock-market?from=${from.toISOString()}&to=${to.toISOString()}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        buy: jasmine.objectContaining({ price: 1, time: initDate.getTime() + 2 * 1000 }),
        sell: jasmine.objectContaining({ price: 6, time: initDate.getTime() + 3 * 1000 }),
      });
    });
  });
});
