import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '@/app/features/cart/services/cart.service';
import { WishlistService } from '@/app/features/wishlist/wishlist/services/wishlist.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() product!: any;
  @Output() toggle = new EventEmitter<string>();
  @Output() wishlistChanged = new EventEmitter<string>();

  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private wishlistService: WishlistService
  ) {}

  addProductItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastr.success(res.message, 'FreshCart');

          if (this.product.isInWishlist) {
            this.wishlistService.removeProductFromWishList(id).subscribe({
              next: (removeRes) => {
                if (removeRes.status === 'success') {
                  this.product.isInWishlist = false;
                  this.wishlistChanged.emit(id);
                  this.toastr.info('Removed from wishlist', 'FreshCart');
                }
              },
              error: (err) => console.error(err),
            });
          }
        }
      },
      error: (err) => console.error(err),
    });
  }

  toggleWishlist(id: string, event: Event): void {
    event.stopPropagation();
    this.toggle.emit(id);
  }
}
