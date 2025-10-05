import { Component, inject, Input, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brand/brand.service';
import { Brand } from '../../core/models/brand.interface';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [NgxPaginationModule, RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
  private readonly brandService = inject(BrandService)

  @Input({ required: true }) brand: Brand = {} as Brand;

  brandData: Brand[] = []
  pageSize!: number;
  p!: number;
  total!: number;

  ngOnInit(): void {
    this.getBrand();
  }

  getBrand(pageNumber: number = 1): void {
    this.brandService.getBrandData(pageNumber).subscribe({
      next: (res) => {
        console.log(res);
        this.brandData = res.data;
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
