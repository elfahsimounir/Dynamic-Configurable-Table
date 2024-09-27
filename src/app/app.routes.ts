import { Routes } from '@angular/router';
import { AuthGuard } from '@Services';
import { NotFoundComponent } from '@standComponenets';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren:  () => import('./routes/login').then(mod => mod.routes),
  },
  {
    path: 'brands',
    loadChildren:  () => import('./routes/brands').then(mod => mod.routes),
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    loadChildren:  () => import('./routes/avoire').then(mod => mod.routes),
    canActivate: [AuthGuard]
  },
  {
    path: 'pubs',
    loadChildren:  () => import('./routes/pubs').then(mod => mod.routes),
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    loadChildren:  () => import('./routes/products').then(mod => mod.routes),
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    loadChildren:  () => import('./routes/categories').then(mod => mod.routes),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren:  () => import('./routes/home').then(mod => mod.routes),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];