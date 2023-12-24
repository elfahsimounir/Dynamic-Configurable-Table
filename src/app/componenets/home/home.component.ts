import { Component } from '@angular/core';
import { HomeDetailsComponent } from '../home-details/home-details.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { HomeService } from '../../services/home/home.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HomeDetailsComponent,LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
constructor(public home:HomeService){}

}
