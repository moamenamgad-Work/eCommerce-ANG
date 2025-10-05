import { MainSliderComponent } from './../home/components/main-slider/main-slider.component';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Cart } from './models/cart.interface';
import { ToastrService } from 'ngx-toastr';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  cartUserData: Cart = {} as Cart;

  ngOnInit(): void {
    this.getLoggedUserData();
  }

  getLoggedUserData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartUserData = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItem(id: string): void {
    this.cartService.removeCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartUserData = res.data;
        if (res.status === 'success') {
          this.toastrService.success('Delete Item In Cart', 'FreshCart');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeAllItems(): void {
    this.cartService.removeAllItemCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === 'success') {
          this.cartUserData.products = [];
          this.cartUserData.totalCartPrice = 0;
          this.toastrService.success('All items removed', 'FreshCart');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateCount(id: string, count: number): void {
    this.cartService.updatItemCount(id, count).subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartUserData = res.data;
      },
    });
  }
}
