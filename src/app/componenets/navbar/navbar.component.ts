import { Component, OnInit} from '@angular/core';
import { DarkModeToggleComponent,SignOutComponent } from '@standComponenets';
import {RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { TogglingDirective } from '@directives';
import { LogoutService, RouteConditions } from '@Services';

@Component({
  standalone:true,
  imports:[CommonModule,DarkModeToggleComponent,RouterLink,TogglingDirective,SignOutComponent],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
logout!:LogoutService;

  constructor(public rc:RouteConditions, private logoutService:LogoutService) {}

  ngOnInit(): void {
    this.logout=this.logoutService
  }
}
