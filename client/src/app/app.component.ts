import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { StockApiService } from './services/stock-api.service';
import { BestPriceResult } from './types/stocks';

interface StockStats {
  stocksBoughtAndSold: number;
  profit: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dateControl = new FormGroup({
    fromDate: new FormControl(null, Validators.required),
    toDate: new FormControl(null, Validators.required),
    funds: new FormControl(null),
  });

  dataRange$: Observable<{ start: Date, end: Date }>;
  bestPricePoints$ = new BehaviorSubject<BestPriceResult | null>(null);
  stockStats$: Observable<StockStats>;

  constructor(private stockApi: StockApiService) {
    this.dataRange$ = stockApi.getDataRange();

    this.stockStats$ = this.bestPricePoints$.pipe(
      filter(points => !!points),
      map(points => {
        if (!points?.buy || !points?.sell) {
          return { stocksBoughtAndSold: 0, profit: 0 };
        }
        const funds = this.dateControl.value.funds ?? 0;
        const stocks = Math.floor(funds / points.buy.price);
        const profit = stocks * points.sell.price;
        return { stocksBoughtAndSold: stocks, profit };
      })
    )
  }

  getStockBuySellBest() {
    const { fromDate, toDate } = this.dateControl.value; 
    if (!fromDate || !toDate || fromDate > toDate ) {
      return;
    }
    
    this.stockApi.getBuySellTimes(fromDate, toDate)
      .subscribe(result => this.bestPricePoints$.next(result));
  }
}
