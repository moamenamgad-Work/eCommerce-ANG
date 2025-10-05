import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from './services/details.service';
import { Products } from '../../core/models/products.interface';
import { Brand } from '../../core/models/brand.interface';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly detailsService = inject(DetailsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  id: string | null = null;
  Delprpduct: Products = {} as Products;
  DelBrand: Brand = {} as Brand;
  selectedImage: string | null = null;

  ngOnInit(): void {
    this.getProductId();
    this.showProductDetails();
    this.getBrandId();
    this.showBrandDetails();
  }

  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlid) => (this.id = urlid.get('id')),
    });
  }

  showProductDetails(): void {
    this.detailsService.getProductDetails(this.id).subscribe({
      next: (res) => {
        this.Delprpduct = res.data;
        this.selectedImage = this.Delprpduct.imageCover;
      },
    });
  }
  changeImage(img: string): void {
    this.selectedImage = img;
  }

  getBrandId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlid) => (this.id = urlid.get('id')),
    });
  }

  showBrandDetails(): void {
    this.detailsService.getBradDetails(this.id).subscribe({
      next: (res) => {
        this.DelBrand = res.data;
      },
    });
  }

  addProductItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
