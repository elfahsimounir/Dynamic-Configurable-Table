// auth-data-resolver.service.ts

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthResolver implements Resolve<boolean> {
  constructor(private cookieService: CookieService) {}

  resolve(): Observable<boolean> {
    const isAuthenticated = this.cookieService.get('approved') === 'true';
    return of(isAuthenticated);
  }
}
