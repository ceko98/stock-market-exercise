import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BestPriceResult } from '../types/stocks';

@Injectable({
  providedIn: 'root'
})
export class StockApiService {
  private readonly url = '/stock-market';

  constructor(private http: HttpClient) { }

  getBuySellTimes(from: Date, to: Date) {
    return this.http.get<BestPriceResult>(
      this.url,
      { params: { from: from.toISOString(), to: to.toISOString() } },
    );
  }

  getDataRange() {
    return this.http.get<{ start: Date, end: Date }>(`${this.url}/range`);
  }
}
