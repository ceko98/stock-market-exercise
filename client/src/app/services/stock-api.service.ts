import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BuySellResult } from '../types/stocks';

@Injectable({
  providedIn: 'root'
})
export class StockApiService {
  private readonly url = '/stock-market';

  constructor(private http: HttpClient) { }

  getBuySellTimes() {
    return this.http.get<{ result: BuySellResult }>(this.url)
      .pipe(map(({ result }) => result));
  }
}
