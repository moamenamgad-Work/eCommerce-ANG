import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);

  getproduct(pageNumber: number = 1): Observable<any> {
    return this.http.get(environment.baseUrl + `products?page=${pageNumber}`);
  }
}
