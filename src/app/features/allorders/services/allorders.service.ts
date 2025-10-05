import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AllordersService {
  private readonly httpClient = inject(HttpClient);

  getAllOrders(id: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `orders/user/${id}`);
  }
}
