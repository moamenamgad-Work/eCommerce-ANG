import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

import { WishlistService } from './services/wishlist.service';
import { CardComponent } from '@/app/shared/components/card/card.component';
import { CartService } from '../../cart/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlistData: any[] = [];

  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getLoggedToWishList();
  }

  getLoggedToWishList(): void {
    this.wishlistService.getLoggedUserToWishList().subscribe({
      next: (res) => {
        this.wishlistData = (res?.data ?? []).map((item: any) => ({
          ...item,
          isInWishlist: true,
        }));
      },
      error: (err) => console.error(err),
    });
  }

  toggleWishlist(productId: string): void {
    const product = this.wishlistData.find((p) => p._id === productId);

    if (product?.isInWishlist) {
      this.wishlistService.removeProductFromWishList(productId).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.wishlistData = this.wishlistData.filter(
              (p) => p._id !== productId
            );
            this.toastr.info('Removed from wishlist', 'FreshCart');
          }
        },
      });
    } else {
      this.wishlistService.AddProductToWishList(productId).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.wishlistData.push({ ...res.data, isInWishlist: true });
            this.toastr.success('Added to wishlist', 'FreshCart');
          }
        },
      });
    }
  }

  onWishlistChanged(productId: string) {
    this.wishlistData = this.wishlistData.filter((p) => p._id !== productId);
  }

  addAllToCart(): void {
    if (this.wishlistData.length === 0) return;

    const addRequests = this.wishlistData.map((item) =>
      this.cartService.addProductToCart(item._id)
    );

    forkJoin(addRequests).subscribe({
      next: () => {
        this.toastr.success('All products added to cart', 'FreshCart');

        const ids = this.wishlistData.map((p) => p._id);

        forkJoin(this.wishlistService.clearWishlist(ids)).subscribe({
          next: () => {
            this.wishlistData = [];
          },
        });
      },
      error: (err) => console.error(err),
    });
  }

  trackById(index: number, item: any) {
    return item._id;
  }
}
