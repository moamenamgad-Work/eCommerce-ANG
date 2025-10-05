import { Component, inject, OnInit } from '@angular/core';
import { AllordersService } from './services/allorders.service';
import { Allorders } from './modules/allorders.interface';
import { DatePipe, NgClass } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

interface DecodedToken {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

@Component({
  selector: 'app-allorders',
  imports: [NgClass, DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {
  private readonly allordersService = inject(AllordersService);
  private readonly cookieService = inject(CookieService);

  allOrdersData: Allorders[] = [];

  ngOnInit(): void {
    const userId = this.getID();
    if (userId) {
      this.getAllOrdersinCom(userId);
    }
  }

  getAllOrdersinCom(id: string): void {
    this.allordersService.getAllOrders(id).subscribe({
      next: (res) => {
        console.log('Orders response:', res);
        this.allOrdersData = res;
      },
      error: (err) => {
        console.log('Orders error:', err);
      },
    });
  }

  getTotalCount(order: Allorders): number {
    return order.cartItems.reduce((total, ci) => total + ci.count, 0);
  }

  getID(): string | null {
    const token = this.cookieService.get('token');
    if (!token) return null;

    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.id;
  }
}
