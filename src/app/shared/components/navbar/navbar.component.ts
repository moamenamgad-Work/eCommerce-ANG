import { Component, inject, Input } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '@/app/features/cart/services/cart.service';
import { WishlistService } from '@/app/features/wishlist/wishlist/services/wishlist.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private flowbiteService: FlowbiteService) {}

  private readonly cookieService = inject(CookieService);
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);

  @Input({ required: true }) islogin!: boolean;

  get cartCount() {
    return this.cartService.cartCount();
  }
  get wishlistCount() {
    return this.wishlistService.wishlistCount();
  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => initFlowbite());

    if (this.cookieService.get('token')) {
      this.cartService.getLoggedUserCart().subscribe({
        next: (res: any) =>
          this.cartService.cartCount.set(
            res.numOfCartItems || res.data?.length || 0
          ),
        error: () => this.cartService.cartCount.set(0),
      });

      this.wishlistService.getLoggedUserToWishList().subscribe({
        next: (res: any) => {
          this.wishlistService.wishlistCount.set(
            res.count ?? res.data?.length ?? 0
          );
        },
        error: () => this.wishlistService.wishlistCount.set(0),
      });
    }
  }

  signOut(): void {
    this.authService.logOut();
  }
}
