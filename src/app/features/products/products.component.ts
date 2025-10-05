import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../core/services/products/products.service';
import { WishlistService } from '@/app/features/wishlist/wishlist/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    NgxPaginationModule,
    SearchPipe,
    FormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastr = inject(ToastrService);

  productData: any[] = [];
  wishlistIds: string[] = []; // نخزن IDs هنا
  text: string = '';
  pageSize!: number;
  p: number = 1;
  total!: number;

  ngOnInit(): void {
    this.loadWishlistFromLocal();
    this.getProductData();
    this.refreshWishlistFromApi(); // يحدث من السيرفر بعد ما يحمل
  }

  private loadWishlistFromLocal() {
    const local = localStorage.getItem('wishlist');
    this.wishlistIds = local ? JSON.parse(local) : [];
  }

  getProductData(pageNumber: number = 1): void {
    this.productsService.getproduct(pageNumber).subscribe({
      next: (res) => {
        this.productData = (res.data ?? []).map((p: any) => ({
          ...p,
          isInWishlist: this.wishlistIds.includes(p._id), // نعلم القلوب من localStorage
        }));
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
      },
      error: (err) => {
        console.log(err);
      },
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
