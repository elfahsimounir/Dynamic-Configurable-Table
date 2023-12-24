import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CorrectRouteService {

  private currentRoute: string = '';

  constructor(private router: Router) {
    this.detectRoute();
  }

 detectRoute(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1)
      )
      .subscribe(() => {
        // Use router.url to get the current route
        this.currentRoute = this.router.url;
      });
  }

  public getCurrentRoute(): string {
    return this.currentRoute;
  }

  public isHomeRoute(): boolean {
    // Check if the current route ends with '/home'
    return  this.router.url ==='/home'
  }
}
