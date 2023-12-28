import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { NotFoundComponent } from './componenets/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren:  () => import('./routes/login').then(mod => mod.routes),
    canActivate: [AuthGuard]
  },
  {
    path: 'avoire',
    loadChildren:  () => import('./routes/avoire').then(mod => mod.routes),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren:  () => import('./routes/home').then(mod => mod.routes),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];