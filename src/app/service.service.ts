import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of} from 'rxjs';

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

  private api_key = 'c0304a6e20-61b88939c6-sehzw7';
  private fetchAllCache: Record<string, { results: { [key: string]: number } }> = {};
  private currencyListCache: string[] | null = null;

  getApiFetchAll(
    from: string
  ): Observable<{ results: { [key: string]: number } }> {
    if (this.fetchAllCache[from]) {
      return of(this.fetchAllCache[from]);
    }
    const url = `https://api.fastforex.io/fetch-all?from=${from}&api_key=${this.api_key}`;
    return this.http.get<{ results: { [key: string]: number } }>(url).pipe(
      map((response) => {
        this.fetchAllCache[from] = { results: response.results };
        return { results: response.results };
      }),
      catchError(() => {
        console.error('API call failed, returning mock data');
        return of({ results: this.mockDataFetchAll[from]?.results });
      })
    );
  }

  getApiCurrencyList(): Observable<string[]> {
    if (this.currencyListCache) {
      return of(this.currencyListCache);
    }
    const url = `https://api.fastforex.io/currencies?api_key=${this.api_key}`;
    return this.http.get<{ currencies: { [key: string]: string } }>(url).pipe(
      map((response) => {
        const currencyList = Object.keys(response.currencies);
        this.currencyListCache = currencyList;
        return currencyList;
      }),
      catchError(() => {
        console.error('API call failed, returning mock data');
        return of(Object.keys(this.mockCurrencyList));
      })
    );
  }
}
