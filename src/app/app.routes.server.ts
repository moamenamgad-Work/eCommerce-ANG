// import { RenderMode, ServerRoute } from '@angular/ssr';

// export const serverRoutes: ServerRoute[] = [
//   {
//     path: '**',
//     renderMode: RenderMode.Prerender
//   }
// ];

import { ServerRoute, RenderMode } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '', // الصفحة الرئيسية
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'login',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'register',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'forgot',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'home',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'brands',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'categories',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'wishlist',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'cart',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'allorders',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'details/:id/:slug',
    renderMode: RenderMode.Client, // مش يتم prerender له
  },
  {
    path: 'details/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Server, // fallback
  },
];
