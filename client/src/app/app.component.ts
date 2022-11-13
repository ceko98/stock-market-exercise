import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { StockApiService } from './services/stock-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dateControl = new FormGroup({
    fromDate: new FormControl(null, Validators.required),
    toDate: new FormControl(null, Validators.required),
  });

  dataRange$: Observable<{ start: Date, end: Date }>;

  constructor(private stockApi: StockApiService) {
    this.dataRange$ = stockApi.getDataRange();
  }

  getStockBuySellBest() {
    const { fromDate, toDate } = this.dateControl.value; 
    if (!fromDate || !toDate || fromDate > toDate ) {
      return;
    }
    
    this.stockApi.getBuySellTimes(fromDate, toDate).subscribe(console.log)
  }
}
