import { environment } from '@/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  // ✅ Signal للعداد
  cartCount = signal<number>(0);

  myHeader: object = {
    headers: {
      token: this.cookieService.get('token'),
    },
  };

  private updateCartCount(count: number) {
    this.cartCount.set(count);
  }

  addProductToCart(id: string): Observable<any> {
    return this.httpClient
      .post(environment.baseUrl + `cart`, { productId: id }, this.myHeader)
      .pipe(
        tap((res: any) => {
          this.updateCartCount(
            res.numOfCartItems ?? res.data?.products?.length ?? 0
          );
        })
      );
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient
      .get(environment.baseUrl + 'cart', this.myHeader)
      .pipe(
        tap((res: any) => {
          this.updateCartCount(
            res.numOfCartItems ?? res.data?.products?.length ?? 0
          );
        })
      );
  }

  removeCartItem(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.baseUrl + `cart/${id}`, this.myHeader)
      .pipe(
        tap((res: any) => {
          this.updateCartCount(
            res.numOfCartItems ?? res.data?.products?.length ?? 0
          );
        })
      );
  }

  removeAllItemCart(): Observable<any> {
    return this.httpClient
      .delete(environment.baseUrl + 'cart', this.myHeader)
      .pipe(
        tap(() => {
          this.updateCartCount(0);
        })
      );
  }

  updatItemCount(id: string, count: number): Observable<any> {
    return this.httpClient
      .put(environment.baseUrl + `cart/${id}`, { count }, this.myHeader)
      .pipe(
        tap((res: any) => {
          this.updateCartCount(
            res.numOfCartItems ?? res.data?.products?.length ?? 0
          );
        })
      );
  }

  CheckOutSessions(id: string | null, data: Object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl +
        `orders/checkout-session/${id}?url=http://localhost:4200`,
      data,
      this.myHeader
    );
  }

  CheckOutCash(id: string | null, data: Object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + `orders/${id}`,
      data,
      this.myHeader
    );
  }
}
