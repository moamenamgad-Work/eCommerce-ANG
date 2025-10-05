import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { authGuard } from './core/guards/auth/auth/auth-guard';
import { blankGuard } from './core/guards/auth/blank/blank-guard';
import { LoginComponent } from './core/auth/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [blankGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login Page',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        title: 'Register Page',
      },
      {
        path: 'forgot',
        loadComponent: () =>
          import('./core/auth/forgot/forgot.component').then(
            (c) => c.ForgotComponent
          ),
        title: 'Forgot Page',
      },
    ],
  },

  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component').then((c) => c.HomeComponent),
        title: 'Home Page',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/brands/brands.component').then(
            (c) => c.BrandsComponent
          ),
        title: 'Brands Page',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart.component').then((c) => c.CartComponent),
        title: 'Cart Page',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./features/wishlist/wishlist/wishlist.component').then(
            (c) => c.WishlistComponent
          ),
        title: 'Wishlist Page',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
        title: 'Categories Page',
      },
      {
        path: 'details/:id/:slug',
        loadComponent: () =>
          import('./features/details/details.component').then(
            (c) => c.DetailsComponent
          ),
        title: 'Details Page',
        data: { renderMode: 'client' },
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./features/details/details.component').then(
            (c) => c.DetailsComponent
          ),
        title: 'Details Page',
        data: { renderMode: 'client' },
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products.component').then(
            (c) => c.ProductsComponent
          ),
        title: 'Products Page',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./features/checkout/checkout.component').then(
            (c) => c.CheckoutComponent
          ),
        title: 'Checkout Page',
        data: { renderMode: 'client' },
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./features/allorders/allorders.component').then(
            (c) => c.AllordersComponent
          ),
        title: 'All Orders Page',
      },
    ],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./features/notfound/notfound.component').then(
        (c) => c.NotfoundComponent
      ),
    title: 'Notfound Page',
  },
];
