import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Rate } from './models/rate';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}
  

  private api_key = '591331e37b-e8521bf4f2-se50gm';

  getApiFetchAll(from: string): Observable<{ results: Rate }> {
    const url = `https://api.fastforex.io/fetch-all?from=${from}&api_key=${this.api_key}`;
    return this.http.get<{ results: Rate }>(url).pipe(
      map((response) => ({
        results: response.results,
      }))
    );
  }

  getApiCurrencyList(): Observable<string[]> {
    const url = `https://api.fastforex.io/currencies?api_key=${this.api_key}`;
    return this.http
      .get<{ currencies: { [key: string]: string } }>(url)
      .pipe(map((response) => Object.keys(response.currencies)));
  }
}
