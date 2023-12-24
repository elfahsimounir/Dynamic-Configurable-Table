import { Component, OnInit} from '@angular/core';
import { DarkModeToggleComponent } from '../dark-mode-toggle/dark-mode-toggle.component';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../services/home/home.service';



@Component({
  standalone:true,
  imports:[CommonModule,DarkModeToggleComponent,],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
correctRoute!:string;

  constructor(private router: Router,public home:HomeService) {}

  ngOnInit(): void {
    this.correctRoute=this.router.url
      }
}
   