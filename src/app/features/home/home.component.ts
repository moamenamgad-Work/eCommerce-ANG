import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Products } from '../../core/models/products.interface';
import { CardComponent } from '../../shared/components/card/card.component';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { ProductCategoriesComponent } from './components/product-categories/product-categories.component';
import { ProductPopularComponent } from './components/product-popular/product-popular.component';

@Component({
  selector: 'app-home',
  imports: [
    CardComponent,
    MainSliderComponent,
    ProductCategoriesComponent,
    ProductPopularComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  protuctData: Products[] = [];

  ngOnInit(): void {
    this.getProductData();
  }

  getProductData() {
    this.productsService.getproduct().subscribe({
      next: (res) => {
        this.protuctData = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
