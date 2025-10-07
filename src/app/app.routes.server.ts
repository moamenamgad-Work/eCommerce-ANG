// import { RenderMode, ServerRoute } from '@angular/ssr';

// export const serverRoutes: ServerRoute[] = [
//   {
//     path: '**',
//     renderMode: RenderMode.Prerender
//   }
// ];

// import { ServerRoute, RenderMode } from '@angular/ssr';

// export const serverRoutes: ServerRoute[] = [
//   {
//     path: '', // الصفحة الرئيسية
//     renderMode: RenderMode.Server,
//   },
//   {
//     path: 'login',
//     renderMode: RenderMode.Prerender,
//   },
//   {
//     path: 'register',
//     renderMode: RenderMode.Prerender,
//   },
//   {
//     path: 'forgot',
//     renderMode: RenderMode.Prerender,
//   },
//   {
//     path: 'home',
//     renderMode: RenderMode.Prerender,
//   },
//   {
//     path: 'brands',
//     renderMode: RenderMode.Prerender,
//   },
//   {
//     path: 'categories',
//     renderMode: RenderMode.Prerender,
//   },
//   {
//     path: 'wishlist',
//     renderMode: RenderMode.Prerender,
//   },
//   {
//     path: 'cart',
//     renderMode: RenderMode.Prerender,
//   },
//   {
//     path: 'allorders',
//     renderMode: RenderMode.Prerender,
//   },
//   {
//     path: 'details/:id/:slug',
//     renderMode: RenderMode.Server, // مش يتم prerender له
//   },
//   {
//     path: 'details/:id',
//     renderMode: RenderMode.Server,
//   },
//   {
//     path: 'checkout/:id',
//     renderMode: RenderMode.Server,
//   },
//   {
//     path: '**',
//     renderMode: RenderMode.Server, // fallback
//   },
// ];

import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // ✅ Static & Auth pages (prerender for speed & SEO)
  { path: '', renderMode: RenderMode.Server }, // Redirect root to login
  { path: 'login', renderMode: RenderMode.Prerender },
  { path: 'register', renderMode: RenderMode.Prerender },
  { path: 'forgot', renderMode: RenderMode.Prerender },

  // ✅ Public / content pages (good candidates for prerender)
  { path: 'home', renderMode: RenderMode.Prerender },
  { path: 'brands', renderMode: RenderMode.Prerender },
  { path: 'categories', renderMode: RenderMode.Prerender },
  { path: 'products', renderMode: RenderMode.Prerender },

  // ✅ Dynamic / data-driven pages (SSR rendering)
  { path: 'details/:id/:slug', renderMode: RenderMode.Server },
  { path: 'details/:id', renderMode: RenderMode.Server },

  // ✅ Auth-protected pages (SSR for session validation)
  { path: 'cart', renderMode: RenderMode.Server },
  { path: 'wishlist', renderMode: RenderMode.Server },
  { path: 'checkout/:id', renderMode: RenderMode.Server },
  { path: 'allorders', renderMode: RenderMode.Server },

  // ⚠️ Fallback (404)
  { path: '**', renderMode: RenderMode.Server },
];
