import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  NavigationStart,
} from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  lastNavigationTrigger: NavigationStart | undefined | any;
  isAuthenticated: any;
  constructor(
     private cookieService: CookieService,
     private router: Router
             ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        tap((event) => (this.lastNavigationTrigger = event))
      )
      .subscribe();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isAuthenticated = this.cookieService.get('approved');
    this.isAuthenticated = isAuthenticated;
    if (!isAuthenticated && state.url === '/login') {
      return true;
    }
    if (isAuthenticated && state.url === '/login') {
      return this.router.createUrlTree(['/home']);
    }

    if (state.url === '/login') {
      if (this.lastNavigationTrigger?.navigationTrigger === 'imperative') {
        return false;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }

    if (isAuthenticated) {
      return true;
    }

    return this.router.createUrlTree(['/login']);
  }
}
