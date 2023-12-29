import { Component, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthGuard } from '@Services';
import { NavbarComponent } from './componenets/navbar/navbar.component';
import { FooterComponent } from './componenets/footer/footer.component';
import { AvoireComponent } from './componenets/avoire/avoire.component';
import { HomeComponent } from './componenets/home/home.component';
import { RouteConditions } from './services/route-conditions/route-conditions.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,NavbarComponent,FooterComponent,AvoireComponent,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  auth!:AuthGuard;
  constructor(private authService:AuthGuard,public rc:RouteConditions) {}
  ngOnInit(): void {
    this.auth = this.authService
  }
}
