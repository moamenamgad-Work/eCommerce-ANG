import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ProductsService } from '../../../../core/services/products/products.service';
import { WishlistService } from '@/app/features/wishlist/wishlist/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-popular',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './product-popular.component.html',
  styleUrls: ['./product-popular.component.css'],
})
export class ProductPopularComponent implements OnInit {
  productData: any[] = [];
  wishlistIds: string[] = []; // هنا هنخزن الـ IDs من localStorage

  private readonly productsService = inject(ProductsService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadWishlistFromLocal();
    this.getProductData();
    this.refreshWishlistFromApi(); // يحدث البيانات من السيرفر بعدين
  }

  private loadWishlistFromLocal() {
    const local = localStorage.getItem('wishlist');
    this.wishlistIds = local ? JSON.parse(local) : [];
  }

  getProductData() {
    this.productsService.getproduct().subscribe({
      next: (res) => {
        this.productData = (res?.data ?? []).map((p: any) => ({
          ...p,
          isInWishlist: this.wishlistIds.includes(p._id), // نعلم القلب فورًا من localStorage
        }));
      },
      error: (err) => console.log(err),
    });
  }

  private refreshWishlistFromApi() {
    this.wishlistService.getLoggedUserToWishList().subscribe({
      next: (res) => {
        this.wishlistIds = (res?.data ?? []).map((i: any) => i._id);
        localStorage.setItem('wishlist', JSON.stringify(this.wishlistIds));

        // نحدث القلوب على حسب السيرفر
        this.productData = this.productData.map((p) => ({
          ...p,
          isInWishlist: this.wishlistIds.includes(p._id),
        }));
      },
      error: () => {},
    });
  }

  toggleWishlist(productId: string) {
    const product = this.productData.find((p) => p._id === productId);
    if (!product) return;

    if (product.isInWishlist) {
      this.wishlistService.removeProductFromWishList(productId).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            product.isInWishlist = false;
            this.wishlistIds = this.wishlistIds.filter(
              (id) => id !== productId
            );
            localStorage.setItem('wishlist', JSON.stringify(this.wishlistIds));
            this.toastr.info('Removed from wishlist', 'FreshCart');
          }
        },
      });
    } else {
      this.wishlistService.AddProductToWishList(productId).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            product.isInWishlist = true;
            this.wishlistIds.push(productId);
            localStorage.setItem('wishlist', JSON.stringify(this.wishlistIds));
            this.toastr.success(
              res.message ?? 'Added to wishlist',
              'FreshCart'
            );
          }
        },
      });
    }
  }

  trackById(index: number, item: any) {
    return item._id;
  }
}
