import { Component } from '@angular/core';
import { HomeDetailsComponent } from '@standComponenets';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RouteConditions } from '@Services';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HomeDetailsComponent,RouterOutlet,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
constructor(public rc:RouteConditions){}

  
}
