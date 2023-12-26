import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../../services/logout/logout.service';

@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [],
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.scss'
})
export class SignOutComponent implements OnInit{
  logout!:LogoutService
constructor(private logoutService:LogoutService){}
ngOnInit(): void {
    this.logout=this.logoutService
}
}
