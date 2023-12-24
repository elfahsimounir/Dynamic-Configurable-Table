import { Routes } from '@angular/router';
import { LoginComponent } from './componenets/login/login.component';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { HomeComponent } from './componenets/home/home.component';
import { AvoireComponent } from './componenets/avoire/avoire.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'avoire',
    component: AvoireComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', component: NotFoundComponent },
];
