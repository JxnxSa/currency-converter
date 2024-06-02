import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Rate } from './models/rate';

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
        ANG: 0.48646,
        AOA: 232.34593,
        ARS: 243.55344,
        AUD: 0.4098,
        AWG: 0.49263,
        AZN: 0.4625,
        BAM: 0.49085,
      },
    },
    AFN: {
      results: {
        AED: 0.05115,
        AFN: 1,
        ALL: 1.2993,
        AMD: 5.4015,
        ANG: 0.02488,
        AOA: 11.88157,
        ARS: 12.45673,
        AUD: 0.02096,
        AWG: 0.0252,
        AZN: 0.02366,
        BAM: 0.02511,
      },
    },
    ALL: {
      results: {
        AED: 0.03939,
        AFN: 0.7696,
        ALL: 1,
        AMD: 4.21,
        ANG: 0.01915,
        AOA: 9.1497,
        ARS: 9.5958,
        AUD: 0.01615,
        AWG: 0.0194,
        AZN: 0.01834,
        BAM: 0.01945,
      },
    },
    AMD: {
      results: {
        AED: 0.00947,
        AFN: 0.1845,
        ALL: 0.2375,
        AMD: 1,
        ANG: 0.00455,
        AOA: 2.1759,
        ARS: 2.2823,
        AUD: 0.00384,
        AWG: 0.0046,
        AZN: 0.00435,
        BAM: 0.0046,
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
    const url = `https://api.fastforex.io/fetch-alll?from=${from}&api_key=${this.api_key}`;
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
