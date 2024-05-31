import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-currency-select',
  templateUrl: './currency-select.component.html',
  styleUrls: ['./currency-select.component.css']
})
export class CurrencySelectComponent {
  @Input() currencyList: string[] = [];
  @Input() selectedCurrency: string = '';
  @Output() selectedCurrencyChange = new EventEmitter<string>();

  onCurrencyChange(newCurrency: string) {
    this.selectedCurrencyChange.emit(newCurrency);
  }
  
}
