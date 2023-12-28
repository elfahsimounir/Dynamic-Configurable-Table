import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Injectable({
 providedIn: 'root'
})
export class RouteConditions {
  constructor(private router: Router) { }

  currentRoute(parent: string, child: string): boolean {
    if (child) {
      return this.router.url === `/${parent}/${child}` 
    } else {
      return this.router.url.startsWith(`/${parent}`);
    }
  }

}
