import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BuySellResult } from '../types/stocks';

@Injectable({
  providedIn: 'root'
})
export class StockApiService {
  private readonly url = 'http://api:3000';

  constructor(private http: HttpClient) { }

  getBuySellTimes() {
    const url = `${this.url}/stock-market`;
    return this.http.get<{ result: BuySellResult }>(url)
      .pipe(map(({ result }) => result));
  }
}
