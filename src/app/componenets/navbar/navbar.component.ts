import { Component, OnInit} from '@angular/core';
import { DarkModeToggleComponent } from '../dark-mode-toggle/dark-mode-toggle.component';
import {Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../services/home/home.service';
import { TogglingDirective } from '../../directives/toggling.directive';
import { SignOutComponent } from '../sign-out/sign-out.component';

@Component({
  standalone:true,
  imports:[CommonModule,DarkModeToggleComponent,RouterLink,TogglingDirective,SignOutComponent],
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
   