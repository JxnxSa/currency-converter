import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  private mockDataFetchAll: Record<string, { results: { [key: string]: number } }> = {
    AED: {
      results: {
        AED: 1,
        AFN: 19.54902,
        ALL: 25.3909,
        AMD: 105.53568,
      },
    },
    AFN: {
      results: {
        AED: 0.05115,
        AFN: 1,
        ALL: 1.2993,
        AMD: 5.4015,
      },
    },
    ALL: {
      results: {
        AED: 0.03939,
        AFN: 0.7696,
        ALL: 1,
        AMD: 4.21,
      },
    },
    AMD: {
      results: {
        AED: 0.00947,
        AFN: 0.1845,
        ALL: 0.2375,
        AMD: 1,
      },
    },
  };

  // Mock data for currencies list
  private mockCurrencyList = {
    AED: 'United Arab Emirates Dirham',
    AFN: 'Afghan Afghani',
    ALL: 'Albanian Lek',
    AMD: 'Armenian Dram',
  };

  private api_key = '591331e37b-e8521bf4f2-se50gm';
  getApiFetchAll(
    from: string
  ): Observable<{ results: { [key: string]: number } }> {
    const url = `https://api.fastforex.io/fetch-all?from=${from}&api_key=${this.api_key}`;
    return this.http.get<{ results: { [key: string]: number } }>(url).pipe(
      map((response) => ({
        results: response.results,
      })),
      catchError(() => {
        console.error('API call failed, returning mock data');
        return of({ results: this.mockDataFetchAll[from]?.results || {} });
      })
    );
  }

  getApiCurrencyList(): Observable<string[]> {
    const url = `https://api.fastforex.io/currencies?api_key=${this.api_key}`;
    return this.http.get<{ currencies: { [key: string]: string } }>(url).pipe(
      map((response) => Object.keys(response.currencies)),
      catchError(() => {
        console.error('API call failed, returning mock data');
        return of(Object.keys(this.mockCurrencyList));
      })
    );
  }
}
