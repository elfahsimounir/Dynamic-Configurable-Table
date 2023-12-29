import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '@Services';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent   implements OnInit{
  login!: LoginService;
  constructor(private loginServices:LoginService) {}
  ngOnInit(): void { 
    this.login=this.loginServices
  }
}
