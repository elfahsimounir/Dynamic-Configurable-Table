import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private cookieService: CookieService, private router: Router) {}
  logoutAnswer:boolean=false;


logoutHandler(){
  this.logoutAnswer=!this.logoutAnswer
}
logout() {
  if (this.cookieService.check('approved')) {
    this.cookieService.delete('approved');
    this.router.navigate(['/auth']);
  } else {
    console.error('Cookie "approved" does not exist.');
  }

}
}
