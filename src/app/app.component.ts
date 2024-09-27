import { Component, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet } from '@angular/router';
import { AuthGuard } from '@Services';
import { NavbarComponent, FooterComponent } from '@standComponenets';
import { RouteConditions } from '@Services';
import { AuthService } from './services/auth-service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,NavbarComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  auth!:boolean;
  constructor(private authService:AuthService,public rc:RouteConditions) {
  }
  ngOnInit(): void {
this.auth=this.authService.isLoggedIn()
  }
}
