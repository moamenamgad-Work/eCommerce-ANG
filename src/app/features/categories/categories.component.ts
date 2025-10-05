import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Categories } from '../../core/models/categories.interface';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-categories',
  imports: [CardComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  categoryData: Categories[] = [];

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoriesService.getAllGategories().subscribe({
      next: (res) => {
        this.categoryData = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
