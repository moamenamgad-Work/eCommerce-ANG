import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { environment } from '@/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly http = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  wishlistCount = signal<number>(0);
  constructor() {
    this.loadWishlistCount();
  }

  private get headers() {
    return {
      headers: {
        token: this.cookieService.get('token'),
      },
    };
  }

  loadWishlistCount() {
    if (!this.cookieService.check('token')) {
      this.wishlistCount.set(0);
      return;
    }

    this.getLoggedUserToWishList().subscribe({
      next: (res: any) => {
        this.wishlistCount.set(res.count || res.data?.length || 0);
      },
      error: () => this.wishlistCount.set(0),
    });
  }

  private updateWishlistCount(count: number) {
    this.wishlistCount.set(count);
    localStorage.setItem('wishlistCount', count.toString());
  }

  getLoggedUserToWishList(): Observable<any> {
    if (!this.cookieService.check('token')) {
      this.updateWishlistCount(0);
      return new Observable((observer) => {
        observer.next({ data: [], count: 0 });
        observer.complete();
      });
    }

    return this.http.get(`${environment.baseUrl}wishlist`, this.headers).pipe(
      tap((res: any) => {
        this.updateWishlistCount(res?.count ?? res?.data?.length ?? 0);
      })
    );
  }
  AddProductToWishList(id: string): Observable<any> {
    return this.http
      .post(`${environment.baseUrl}wishlist`, { productId: id }, this.headers)
      .pipe(
        tap((res: any) => {
          this.updateWishlistCount(
            res?.data?.length ?? this.wishlistCount() + 1
          );
        })
      );
  }

  removeProductFromWishList(id: string): Observable<any> {
    return this.http
      .delete(`${environment.baseUrl}wishlist/${id}`, this.headers)
      .pipe(
        tap((res: any) => {
          this.updateWishlistCount(
            res?.data?.length ?? this.wishlistCount() - 1
          );
        })
      );
  }

  clearWishlist(ids: string[]): Observable<any>[] {
    return ids.map((id) =>
      this.http
        .delete(`${environment.baseUrl}wishlist/${id}`, this.headers)
        .pipe(
          tap(() => {
            this.updateWishlistCount(0);
          })
        )
    );
  }
}
