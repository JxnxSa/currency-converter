import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Rate } from '../models/rate';

@Component({
  selector: 'app-convert-page',
  templateUrl: './convert-page.component.html',
  styleUrls: ['./convert-page.component.css'],
})
export class ConvertPageComponent implements OnInit {
  rates: Rate[] = [];
  selectedCurrencyFrom: string = '';
  currencyList: string[] = [];
  updated: string = '';
  amount: string = '';
  convertedAmount: number | null = null;
  targetCurrency: string = '';
  exchangeRate: number | null = null;

  constructor(private apiSer: ServiceService) {}

  getDataFetchAll() {
    if (this.selectedCurrencyFrom) {
      this.apiSer.getApiFetchAll(this.selectedCurrencyFrom).subscribe(
        (res) => {
          console.log(res);
          this.rates = this.convertData([res]);
          console.log(this.rates);

          this.convertCurrency();
        },
        (error) => {
          console.error('Error fetching exchange rates', error);
        }
      );
    }
  }

  convertData(data: any): Rate[] {
    let _data: Rate[] = [];
    _data.push(data[0].results || '');
    
    return _data;
  }

  onCurrencyChange() {
    if (this.selectedCurrencyFrom && this.targetCurrency) {
      this.getDataFetchAll();
    }
  }

  convertCurrency() {
    if (
      this.rates.length > 0 &&
      this.selectedCurrencyFrom &&
      this.targetCurrency
    ) {
      this.exchangeRate = this.rates[0][this.targetCurrency as keyof Rate];
      if (this.exchangeRate && this.amount) {
        const amountNumber = parseFloat(this.amount);
        if (!isNaN(amountNumber) && amountNumber > 0) {
          this.convertedAmount = amountNumber * this.exchangeRate;
        } else {
          this.convertedAmount = null;
        }
      } else {
        this.convertedAmount = null;
      }
    }
  }

  reset() {
    this.selectedCurrencyFrom = '';
    this.amount = '';
    this.targetCurrency = '';
    this.convertedAmount = null;
    this.exchangeRate = null;
    this.rates = [];
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
