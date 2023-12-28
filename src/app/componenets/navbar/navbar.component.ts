import { Component, OnInit} from '@angular/core';
import { DarkModeToggleComponent } from '../dark-mode-toggle/dark-mode-toggle.component';
import {RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { TogglingDirective } from '../../directives/toggling.directive';
import { SignOutComponent } from '../sign-out/sign-out.component';
import { LogoutService } from '../../services/logout/logout.service';
import { RouteConditions } from '../../services/home/route-conditions.service';

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
   