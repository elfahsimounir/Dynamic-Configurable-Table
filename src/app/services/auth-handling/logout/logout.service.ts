import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth-service/auth.service';
@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private cookieService: CookieService, private router: Router,private auth:AuthService) {}
  logoutAnswer:boolean=false;


logoutHandler(){
  this.logoutAnswer=!this.logoutAnswer
}
logout() {
this.auth.logout()
}

}
