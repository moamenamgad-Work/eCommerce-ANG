import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  private readonly httpClient = inject(HttpClient);

  getProductDetails(id: string | null): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `products/${id}`);
  }

  getBradDetails(id: string | null): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `brands/${id}`)
  }
}
