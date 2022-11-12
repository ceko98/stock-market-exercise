import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private stockApi: StockApiService) { }

  getStockBuySellBest() {
    const { fromDate, toDate } = this.dateControl.value; 
    if (!fromDate || !toDate || fromDate > toDate ) {
      return;
    }
    
    this.stockApi.getBuySellTimes().subscribe(console.log)
  }
}
