import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockApiService {
  private readonly url = 'localhost:4200';

  constructor(private http: HttpClient) { }

  stockMarketTime() {
    const url = `${this.url}/stock-market`;
    this.http.get<any>(this.url);
  }
}
