import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Categories } from '../../../../core/models/categories.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-categories',
  imports: [CarouselModule],
  templateUrl: './product-categories.component.html',
  styleUrl: './product-categories.component.css',
})
export class ProductCategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  categoryOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    margin: 10,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
      1000: {
        items: 6,
      },
    },
    nav: false,
  };

  categoriesData: Categories[] = [];

  ngOnInit(): void {
    this.getCategoriesData();
  }

  getCategoriesData() {
    this.categoriesService.getAllGategories().subscribe({
      next: (res) => {
        this.categoriesData = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
