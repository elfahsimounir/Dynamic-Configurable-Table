import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@Services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  login!: LoginService;
  constructor(private loginServices:LoginService,public router:Router) {

  }
  ngOnInit(): void { 
    this.login=this.loginServices
    console.log(this.router.url)
  }

}
