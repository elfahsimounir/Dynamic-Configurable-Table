import { Component } from '@angular/core';
import { HomeDetailsComponent } from '../home-details/home-details.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RouteConditions } from '../../services/home/route-conditions.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HomeDetailsComponent,LoginComponent,RouterOutlet,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
constructor(public rc:RouteConditions){}

  
}
