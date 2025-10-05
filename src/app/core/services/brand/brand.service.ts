import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private readonly httpClient = inject(HttpClient)


  getBrandData(pageNumber: number = 1): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `brands?page=${pageNumber}`)
  }
}
