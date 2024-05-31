import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Rate } from '../models/rate';

@Component({
  selector: 'app-exchange-page',
  templateUrl: './exchange-page.component.html',
  styleUrls: ['./exchange-page.component.css'],
})
export class ExchangePageComponent implements OnInit {
  rates: Rate[] = [];
  selectedCurrency: string = '';
  
  page = 1;
  currencyList: string[] = [];
  amount: number = 0;
  convertedAmount: number | null = null;
  targetCurrency: string = '';

  constructor(private apiSer: ServiceService) {}

  getDataFetchAll() {
    this.apiSer.getApiFetchAll(this.selectedCurrency).subscribe((res) => {
      this.rates = this.convertData([res]);
      console.log(this.rates);
    });
  }

 

  convertData(data: any) {
    let _data = [];

    _data.push({
      ...(data[0].results || ''),
    });

    return _data;
  }

  getCurrencyList() {
    this.apiSer.getApiCurrencyList().subscribe(
      (res) => {
        this.currencyList = res;
      },
      (error) => {
        console.error('Error fetching currency list', error);
      }
    );
  }

  ngOnInit(): void {
    this.getCurrencyList();
  }
}
